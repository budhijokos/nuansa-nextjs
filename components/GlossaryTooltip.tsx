// components/GlossaryTooltip.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info } from "lucide-react";

interface GlossaryTooltipProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export function GlossaryTooltip({ term, definition, children }: GlossaryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shiftAmount, setShiftAmount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tooltipWidth = tooltipRef.current.offsetWidth;
      const vw = document.documentElement.clientWidth;

      const halfWidth = tooltipWidth / 2;
      const centerPos = containerRect.left + containerRect.width / 2;

      let shift = 0;
      if (centerPos - halfWidth < 16) {
        // Overflow left
        shift = 16 - (centerPos - halfWidth);
      } else if (centerPos + halfWidth > vw - 16) {
        // Overflow right
        shift = -((centerPos + halfWidth) - (vw - 16));
      }

      setShiftAmount(shift);
    }
  }, [isVisible]);

  return (
    <span 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => {
        setIsVisible(false);
        setShiftAmount(0); // reset shift when hiding
      }}
      onClick={() => setIsVisible(!isVisible)}
    >
      <span className="cursor-help border-b border-dotted border-emerald-500/50 hover:border-emerald-500 transition-colors bg-emerald-500/5 px-0.5 rounded-sm">
        {children}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.span
            ref={tooltipRef}
            initial={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ 
              left: `calc(50% + ${shiftAmount}px)`
            }}
            className="absolute bottom-full mb-3 z-[1100] w-[280px] max-w-[calc(100vw-32px)] p-3 bg-white dark:bg-stone-900 border border-emerald-100 dark:border-emerald-900/50 rounded-xl shadow-xl shadow-emerald-900/10 dark:shadow-black/50 pointer-events-none"
          >
            <span className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              <span className="flex flex-col">
                <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  Glossary: {term}
                </span>
                <span className="text-xs leading-relaxed text-stone-600 dark:text-stone-400 font-medium">
                  {definition}
                </span>
              </span>
            </span>
            {/* Arrow */}
            <span 
              className="absolute top-full -mt-1 border-8 border-transparent border-t-white dark:border-t-stone-900" 
              style={{
                left: `calc(50% - ${shiftAmount}px)`,
                transform: 'translateX(-50%)'
              }}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
