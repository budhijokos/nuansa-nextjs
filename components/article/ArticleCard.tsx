"use client";

import React from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useBookmarks } from "@/hooks/useBookmarks";
import { getArticleImage } from "@/lib/image-registry";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { ARTICLE_DETAILS } from "@/lib/article-content";
import { calculateReadingTime } from "@/lib/utils";
import { Article } from "@/types/article";
import { toast } from "sonner";

interface ArticleCardProps {
  article: Article;
  variant?: "simple" | "detailed";
  showBookmarkToggle?: boolean;
}

const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AOf7io96gAAAABJRU5ErkJggg==";

export function ArticleCard({ article, variant = "simple", showBookmarkToggle = false }: ArticleCardProps) {
  const { bookmarks, toggleBookmark: toggleSaved, mounted } = useBookmarks();
  const isBookmarked = bookmarks.includes(article.slug);

  const getDynamicReadTime = () => {
    const detail = ARTICLE_DETAILS[article.slug];
    if (detail?.content) {
      const mins = calculateReadingTime(detail.content);
      return `${mins} Menit`;
    }
    return article.readTime;
  };

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleSaved(article.slug);
    
    if (isBookmarked) {
      toast.success("Artikel dihapus dari daftar tersimpan", {
        description: article.title,
        duration: 2000,
      });
    } else {
      toast.success("Artikel berhasil disimpan", {
        description: article.title,
        duration: 2000,
      });
    }
  };

  const handleCardClick = () => {
    toast.loading("Membuka artikel...", {
      id: "article-loading",
      duration: 1500,
    });
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link 
        href={`/artikel/${article.slug}`}
        onClick={handleCardClick}
        className={`group bg-white dark:bg-[#1a1a19] rounded-3xl border border-stone-200 dark:border-stone-800 flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 relative overflow-hidden cursor-pointer ${
          variant === 'detailed' ? 'dark:bg-[#151514] dark:border-stone-850' : ''
        }`}
      >
      {/* Article Image Container */}
      <div className={`relative w-full overflow-hidden ${variant === 'detailed' ? 'h-52' : 'h-48'}`}>
        <ImageOptimizer
          src={getArticleImage(article.slug, article.category)}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Bookmark Toggle / Indicator */}
        {showBookmarkToggle ? (
          <button 
            onClick={handleToggleBookmark}
            className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
              mounted && isBookmarked 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/80 dark:bg-black/40 text-stone-600 dark:text-white hover:bg-emerald-50 dark:hover:bg-emerald-900/40'
            }`}
          >
            {mounted && isBookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>
        ) : (
          mounted && isBookmarked && (
            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-emerald-600 text-white shadow-md z-10">
              <BookmarkCheck className="h-3.5 w-3.5" />
            </div>
          )
        )}

        {variant === 'detailed' && (
          <div className="absolute bottom-4 left-4">
             <span className="inline-flex items-center space-x-1 text-[9px] font-bold text-teal-800 dark:text-teal-400 bg-white/90 dark:bg-stone-900/90 border border-teal-100/60 dark:border-teal-900/30 px-2 py-0.5 rounded-full shadow-sm">
              <span className="h-1 w-1 rounded-full bg-teal-500 animate-pulse" />
              <span>Verified</span>
            </span>
          </div>
        )}
      </div>

      <div className={`flex flex-col flex-grow ${variant === 'detailed' ? 'p-8' : 'p-6'}`}>
        {/* Category Badge */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="h-1 w-6 bg-emerald-700/20 dark:bg-emerald-400/20 rounded-full group-hover:w-10 transition-all duration-500" />
          <span className={`text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest ${variant === 'detailed' ? 'font-mono' : ''}`}>
            {article.category}
          </span>
        </div>

        <h3 className={`${variant === 'detailed' ? 'text-xl' : 'text-lg'} font-bold text-stone-900 dark:text-stone-50 leading-snug mb-3 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors line-clamp-2`}>
          {article.title}
        </h3>
        
        <p className={`text-stone-500 dark:text-stone-300 ${variant === 'detailed' ? 'text-sm' : 'text-[11px]'} leading-relaxed mb-6 flex-grow line-clamp-3`}>
          {article.excerpt}
        </p>

        <div className={`pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between mt-auto ${variant === 'detailed' ? 'pt-6 dark:border-stone-850' : ''}`}>
          <div className="flex flex-col">
            <span className={`text-[9px] text-stone-400 dark:text-stone-400 font-medium ${variant === 'detailed' ? 'text-[10px] font-mono' : ''}`}>
              {getDynamicReadTime()} Bacaan
            </span>
          </div>
          <div className={`rounded-full bg-stone-50 dark:bg-stone-800 border border-stone-100 dark:border-stone-700 flex items-center justify-center text-stone-400 dark:text-stone-500 group-hover:bg-emerald-800 dark:group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-800 dark:group-hover:border-emerald-700 transition-all duration-300 ${variant === 'detailed' ? 'h-10 w-10' : 'h-8 w-8'}`}>
            {variant === 'detailed' ? <ArrowRight className="h-4 w-4" /> : <BookOpen className="h-3.5 w-3.5" />}
          </div>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}
