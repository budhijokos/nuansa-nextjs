"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

interface TransitionContextType {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Reset transitioning state when route changes with a slight delay to ensure smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500); // Minimum time to stay visible after navigation
    return () => clearTimeout(timer);
  }, [pathname]);

  const startTransition = useCallback((href: string) => {
    if (href === pathname) return; // Don't transition to the same page
    
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(href);
    }, 800); // Delay before pushing the new route
  }, [router, pathname]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external or non-standard URLs
      const isExternal = (href.startsWith("http") && !href.startsWith(window.location.origin));
      const isSpecial = href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#");
      const isBlank = anchor.getAttribute("target") === "_blank";
      
      if (isExternal || isSpecial || isBlank) {
        return;
      }

      // Ignore if modifier key was pressed
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) {
        return;
      }

      // Intercept all internal links
      if (href.startsWith("/") || href.startsWith(window.location.origin)) {
        // Ignore assets
        if (href.match(/\.(png|jpg|jpeg|gif|svg|webp|pdf|zip)$/i)) return;
        
        e.preventDefault();
        startTransition(href);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [startTransition]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[999999] bg-stone-50/95 dark:bg-stone-950/95 flex flex-col items-center justify-center space-y-6 transition-colors duration-200"
          >
            {/* Branded Loading Logo */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-4 rounded-full border-2 border-dashed border-emerald-200 dark:border-emerald-900/40"
              />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-16 w-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-2xl font-bold shadow-xl shadow-emerald-900/20 z-10 relative"
              >
                N
              </motion.div>
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center space-y-2">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-stone-900 dark:text-stone-100 font-bold text-sm tracking-tight"
              >
                Menghubungkan Halaman...
              </motion.p>
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-emerald-600"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  const context = useContext(TransitionContext);
  if (context === undefined) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}
