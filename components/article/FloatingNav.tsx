"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sun, Moon, Bookmark, BookmarkCheck, Share2, Printer } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface FloatingNavProps {
  toggleTheme: () => void;
  isDark: boolean;
  mounted: boolean;
  isBookmarked: boolean;
  toggleBookmark: () => void;
  handleShare: () => void;
  handlePrint: () => void;
}

export function FloatingNav({
  toggleTheme,
  isDark,
  mounted,
  isBookmarked,
  toggleBookmark,
  handleShare,
  handlePrint,
}: FloatingNavProps) {
  const handleBackClick = () => {
    toast.loading("Memuat daftar artikel...", { id: "article-loading", duration: 1500 });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-900 no-print">
      <nav aria-label="Navigasi Artikel" className="mx-auto max-w-4xl px-6 h-16 flex items-center justify-between">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Link href="/artikel" onClick={handleBackClick} className="inline-flex items-center space-x-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition">
            <ArrowLeft className="h-4 w-4" />
            <span>Daftar Artikel</span>
          </Link>
        </motion.div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition duration-150 text-stone-600 dark:text-stone-300 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {(mounted && isDark) ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-stone-600" />}
          </button>
          <button 
            type="button"
            onClick={toggleBookmark}
            className={`p-2 rounded-full transition cursor-pointer ${isBookmarked ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-450 dark:bg-emerald-950/40' : 'text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900'}`}
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
          <button 
            type="button"
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-400 transition cursor-pointer"
            aria-label="Share Article"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button 
            type="button"
            onClick={handlePrint}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-900 text-stone-400 transition cursor-pointer"
            aria-label="Print Article"
          >
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
