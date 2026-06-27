"use client";

import React from "react";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface ServiceTabButtonProps {
  id: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
}

export function ServiceTabButton({ id, label, icon: Icon, isActive, onClick }: ServiceTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
        isActive
          ? "bg-stone-950 dark:bg-emerald-800 text-stone-50 shadow-2xl scale-105"
          : "bg-white dark:bg-[#1a1a19] hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200/60 dark:border-stone-850 shadow-sm"
      }`}
    >
      <div className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
        isActive ? "bg-white/10 text-emerald-400" : "bg-stone-100 dark:bg-stone-900 text-stone-400 dark:text-stone-500 group-hover:text-stone-600 dark:group-hover:text-stone-300"
      }`}>
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-sm font-bold tracking-tight">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="activeTabPill"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );
}
