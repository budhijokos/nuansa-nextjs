"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll } from "motion/react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const SectionPlaceholder = ({ className = "h-[400px]" }: { className?: string }) => (
  <div className={`w-full ${className} bg-stone-50/50 dark:bg-stone-950/50 animate-pulse border-y border-stone-200/20`} />
);

interface LazySectionProps {
  children: React.ReactNode;
  placeholder: React.ReactNode;
  rootMargin?: string;
  id?: string;
}

export function LazySection({ children, placeholder, rootMargin = "300px", id }: LazySectionProps) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasIntersected) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasIntersected(true);
        }
      },
      { rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasIntersected, rootMargin]);

  return <div ref={ref} id={id} className="w-full">{hasIntersected ? children : placeholder}</div>;
}

export function CustomCursor({ label }: { label: string | null }) {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { damping: 25, stiffness: 250 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 250 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        x: "-50%",
        y: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: label ? 1 : 0, 
        opacity: label ? 1 : 0 
      }}
      className="fixed z-[9999] pointer-events-none hidden lg:flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-[1px] animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.1)]" />
        <AnimatePresence>
          {label && (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute whitespace-nowrap bg-stone-900 text-stone-50 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-2xl flex items-center space-x-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{label}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-emerald-600 origin-left z-[1000] no-print"
      style={{ scaleX }}
    />
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden relative bg-stone-100/60 ${className}`}>
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center space-x-1 text-xs text-stone-500 dark:text-stone-400 font-medium mb-6">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-3 w-3 text-stone-400" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-stone-900 dark:text-stone-200">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
