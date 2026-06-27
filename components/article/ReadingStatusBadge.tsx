"use client";

import React, { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ReadingStatusBadge() {
  const [count, setCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial random count between 12 and 48
    const initialCount = Math.floor(Math.random() * (48 - 12 + 1)) + 12;
    setCount(initialCount);
    
    // Fade in after a short delay
    const showTimer = setTimeout(() => setIsVisible(true), 1000);

    // Periodically update the count to simulate real-time activity
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        // Keep it within a realistic range
        return Math.max(8, Math.min(64, newCount));
      });
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 px-3 py-1 rounded-full no-print"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <Users className="h-3 w-3 text-emerald-700 dark:text-emerald-400" />
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
            {count} Orang Sedang Membaca
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
