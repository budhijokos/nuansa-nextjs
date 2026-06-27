"use client";

import React from "react";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { Clock } from "lucide-react";
import logoNuansa from "@/src/assets/images/logo-nuansa/logo-nuansa.webp";
import { Breadcrumb } from "@/components/ui/LayoutUtils";
import { ThemedHeroImage } from "./ThemedHeroImage";
import { Article } from "@/types/article";
import { ReadingStatusBadge } from "./ReadingStatusBadge";

interface ArticleHeaderProps {
  article: Article;
  readingTime: string;
  wordCount?: number;
  breadcrumbItems: { label: string; href?: string }[];
  slug: string;
}

export function ArticleHeader({ article, readingTime, wordCount, breadcrumbItems, slug }: ArticleHeaderProps) {
  return (
    <>
      {/* Print Only Header */}
      <div className="print-header hidden print:flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 overflow-hidden bg-white">
             <ImageOptimizer
              src={logoNuansa}
              alt="Logo Nuansa"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div>
            <span className="block font-bold text-stone-900 leading-none">NUANSA</span>
            <span className="block text-[8px] font-bold text-stone-500 uppercase mt-0.5">Psychology Consulting</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-stone-900 uppercase tracking-widest">Article Insight</p>
          <p className="text-[9px] text-stone-500 uppercase tracking-widest">nuansaconsulting.com</p>
        </div>
      </div>

      {/* Main Header */}
      <header className="space-y-6 mb-12">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-start">
            <ReadingStatusBadge />
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center space-x-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30">
            {article.category}
          </span>
          <span className="inline-flex items-center space-x-1.5 text-[10px] font-extrabold text-teal-800 dark:text-teal-400 uppercase tracking-widest px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-100/60 dark:border-teal-900/30 shadow-sm shadow-teal-900/[0.02]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>Ditinjau oleh Tim Psikolog Nuansa</span>
          </span>
        </div>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-white leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center space-x-4 text-stone-400 dark:text-stone-500 text-xs font-medium font-mono">
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{readingTime} Bacaan</span>
          </div>
          {wordCount && wordCount > 0 && (
            <>
              <span>•</span>
              <span className="hidden sm:inline">{wordCount.toLocaleString()} Kata</span>
            </>
          )}
          <span>•</span>
          <span className="font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-[10px]">Oleh Tim Psikolog Nuansa</span>
        </div>
      </header>

      {/* Hero Image Section */}
      <Breadcrumb items={breadcrumbItems} />
      <ThemedHeroImage 
        slug={slug} 
        category={article.category} 
        title={article.title} 
        imageUrl={(article as any).image}
      />
    </>
  );
}
