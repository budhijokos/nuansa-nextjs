"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal, TiltCard } from "@/components/ui/Animations";
import { MIND_ARTICLES } from "@/lib/constants";
import { ARTICLE_DETAILS } from "@/lib/article-content";
import { calculateReadingTime } from "@/lib/utils";
import { ArticleCard } from "@/components/article/ArticleCard";
import { useBookmarks } from "@/hooks/useBookmarks";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ArticlesSection() {
  const { mounted } = useBookmarks();

  return (
    <SectionWrapper
      id="wawasan"
      badge="Edukasi Psikologi Utama"
      title="Tips Kesehatan Mental"
      description="Kumpulan artikel singkat yang dirangkum tim psikolog kami guna memperdalam pemahaman batin, menata pola pikir, dan menjaga keseimbangan emosimu setiap harinya."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {MIND_ARTICLES.slice(0, 4).map((article, idx) => (
          <ScrollReveal key={article.slug} delay={idx * 0.15}>
            <TiltCard className="h-full">
              <ArticleCard article={article} />
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          href="/artikel" 
          className="inline-flex items-center space-x-2 text-xs md:text-sm font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 transition border-b border-emerald-800/30 pb-1 group"
        >
          <span>Lihat Seluruh Artikel</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </SectionWrapper>
  );
}
