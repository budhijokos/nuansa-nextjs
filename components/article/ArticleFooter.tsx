"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Article } from "@/types/article";
import { ConsultationCTAButton } from "./ConsultationCTAButton";
import { getArticleImage } from "@/lib/image-registry";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import logoNuansa from "@/src/assets/images/logo-nuansa/logo-nuansa.webp";

interface ArticleFooterProps {
  relatedArticles: Article[];
  articleTitle: string;
}

export function ArticleFooter({ relatedArticles, articleTitle }: ArticleFooterProps) {
  return (
    <>
      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="mt-20 pt-12 border-t border-stone-200 dark:border-stone-850 related-articles">
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white mb-8">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link 
                key={rel.slug} 
                href={`/artikel/${rel.slug}`}
                className="group bg-white dark:bg-[#151514] overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-850 hover:shadow-lg hover:shadow-emerald-900/5 dark:hover:shadow-emerald-950/5 transition-all flex flex-col sm:flex-row"
              >
                <div className="relative h-32 sm:w-32 shrink-0 overflow-hidden">
                  <ImageOptimizer
                    src={getArticleImage(rel.slug, rel.category)}
                    alt={rel.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="128px"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2 font-mono">{rel.category}</p>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition line-clamp-2">{rel.title}</h3>
                  <div className="mt-3 flex items-center text-[10px] text-stone-400 dark:text-stone-500 font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    <span>Baca</span>
                    <ArrowRight className="h-3 w-3 ml-1.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer CTA */}
      <footer className="mt-20 pt-12 border-t border-stone-200 dark:border-stone-850">
        <div className="bg-stone-100 dark:bg-[#151514] border border-transparent dark:border-stone-850 rounded-3xl p-8 md:p-12 text-center space-y-6">
          <h2 className="text-xl font-bold text-stone-900 dark:text-white">Siap Melangkah Lebih Jauh?</h2>
          <p className="text-stone-500 dark:text-stone-400 text-sm max-w-md mx-auto">
            Dapatkan bimbingan intensif dan personal bersama tim psikolog berlisensi kami.
          </p>
          <div className="pt-2">
            <ConsultationCTAButton 
              articleTitle={articleTitle}
              className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-800 dark:bg-emerald-700 px-8 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-900 dark:hover:bg-emerald-600 active:scale-95 cursor-pointer hover:scale-[1.02]"
            >
              Jadwalkan Konsultasi
            </ConsultationCTAButton>
          </div>
        </div>
      </footer>

      {/* Global Page Footer (Simple) */}
      <footer className="py-12 mt-12 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-900">
        <div className="mx-auto max-w-4xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-9 w-9 flex items-center justify-center rounded-full overflow-hidden bg-white border border-stone-200">
              <ImageOptimizer
                src={logoNuansa}
                alt="Logo Nuansa"
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="block font-sans text-sm font-bold tracking-tight text-stone-900 dark:text-white leading-none">NUANSA</span>
              <span className="block font-mono text-[8px] font-bold tracking-[0.2em] text-stone-400 dark:text-stone-500 uppercase mt-1">Psychology Consulting</span>
            </div>
          </div>
          <p className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-widest font-bold">Health & Wellness Education</p>
        </div>
      </footer>
    </>
  );
}
