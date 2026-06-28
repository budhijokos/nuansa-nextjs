"use client";

import React from "react";
import { motion } from "motion/react";

export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col items-center justify-center space-y-6 transition-colors duration-200">
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
          Menyiapkan Artikel Edukasi
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
    </div>
  );
}
