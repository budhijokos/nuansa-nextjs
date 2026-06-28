"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, ArrowLeft, ArrowRight, Brain, Heart, Sparkles, Bookmark, Sun, Moon, Search, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { MIND_ARTICLES } from "@/lib/constants";
import { ARTICLE_DETAILS } from "@/lib/article-content";
import { calculateReadingTime } from "@/lib/utils";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useArticleFilters } from "@/hooks/useArticleFilters";
import { IMAGE_REGISTRY, getArticleImage } from "@/lib/image-registry";
import { SITE_URL } from "@/lib/metadata";
import { ArticleCard } from "@/components/article/ArticleCard";
import Link from "next/link";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import logoNuansa from "@/src/assets/images/logo-nuansa/logo-nuansa.webp";

// Transparent pixel blur placeholder for lazy loading
const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8AOf7io96gAAAABJRU5ErkJggg==";
import { ConsultationCTAButton } from "@/components/InteractiveArticleElements";
import { useTheme } from "@/components/ThemeProvider";

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function ArticlesPage() {
  const { bookmarks, mounted } = useBookmarks();
  const { filter, setFilter, searchQuery, setSearchQuery, filteredArticles } = useArticleFilters({ 
    articles: MIND_ARTICLES, 
    bookmarks 
  });
  const { isDark, toggleTheme } = useTheme();

  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-emerald-100 dark:selection:bg-emerald-950/50 selection:text-emerald-900 dark:selection:text-emerald-300 transition-colors duration-200">
      <Toaster position="top-center" richColors />
      {/* SEO Meta Tags (Hoisted by React 19 / Next 15) */}
      <title>Artikel Edukasi Kesehatan Mental | Nuansa Psychology Consulting</title>
      <meta name="description" content="Pusat edukasi kesehatan mental & konsultasi psikologi di Tangerang. Kumpulan artikel tepercaya tentang mindfulness, pola asuh, hubungan, emosi, dan burnout oleh PT Nuansa Daya Persada." />
      <meta name="keywords" content="Artikel Psikologi, Kesehatan Mental Tangerang, Tips Meditasi, Mengatasi Burnout, Pola Asuh Anak, Hubungan Keluarga, Nuansa Psychology Consulting" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/artikel`} />
      <meta property="og:title" content="Artikel Edukasi Kesehatan Mental | Nuansa Psychology Consulting" />
      <meta property="og:description" content="Pusat edukasi kesehatan mental & konsultasi psikologi di Tangerang. Temukan artikel tepercaya oleh psikolog berlisensi." />
      <meta property="og:image" content={`${SITE_URL}/banner-nuansa.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${SITE_URL}/artikel`} />
      <meta name="twitter:title" content="Artikel Edukasi Kesehatan Mental | Nuansa Psychology Consulting" />
      <meta name="twitter:description" content="Pusat edukasi kesehatan mental & konsultasi psikologi di Tangerang. Temukan artikel tepercaya oleh psikolog berlisensi." />
      <meta name="twitter:image" content={`${SITE_URL}/banner-nuansa.png`} />

      {/* Canonical URL SEO Tag */}
      <link rel="canonical" href={`${SITE_URL}/artikel`} />

      {/* Breadcrumb List Structured Data Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Beranda",
                "item": "https://nuansaconsulting.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Artikel",
                "item": "https://nuansaconsulting.com/artikel"
              }
            ]
          })
        }}
      />
      
      {/* 1. Header & Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-stone-200 dark:border-stone-900 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full overflow-hidden shadow-md bg-white">
              <ImageOptimizer
                src={logoNuansa}
                alt="Logo Nuansa"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="block font-sans text-base font-bold tracking-tight text-stone-900 dark:text-white leading-none">NUANSA</span>
              <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase mt-1">Psychology Consulting</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition duration-150 text-stone-600 dark:text-stone-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {(mounted && isDark) ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-stone-600" />}
            </button>
            
            <Link 
              href="/" 
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Kembali</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-12 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850">
        <div className="mx-auto max-w-7xl px-6 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 font-mono"
          >
            <BookOpen className="h-3 w-3" />
            <span>Wawasan Psikologi</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-white"
          >
            Pusat Edukasi & <br />
            <span className="text-emerald-800 dark:text-emerald-400 text-3xl md:text-4xl lg:text-5xl">Kesehatan Mental</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto pt-4"
          >
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari artikel (misal: burnout, cemas, parenting)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-12 py-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm group-hover:shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
          
          <div className="pt-4 flex items-center justify-center space-x-2">
            <button 
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full text-xs font-bold transition cursor-pointer ${filter === 'all' ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-lg' : 'bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
            >
              Semua Artikel
            </button>
            <button 
              onClick={() => setFilter("saved")}
              className={`px-6 py-2 rounded-full text-xs font-bold flex items-center space-x-2 transition cursor-pointer ${filter === 'saved' ? 'bg-emerald-800 dark:bg-emerald-700 text-white shadow-lg' : 'bg-stone-100 dark:bg-stone-900 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800'}`}
            >
              <Bookmark className={`h-3 w-3 ${filter === 'saved' ? 'fill-current' : ''}`} />
              <span>Tersimpan {mounted && bookmarks.length > 0 && `(${bookmarks.length})`}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Articles Grid */}
      <section className="py-20 min-h-[400px]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="sr-only">Daftar Artikel Kesehatan Mental</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, idx) => (
                  <motion.div
                    key={article.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <ArticleCard 
                      article={article} 
                      variant="detailed" 
                      showBookmarkToggle={true} 
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <div className="h-20 w-20 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center mx-auto mb-6">
                    {searchQuery ? <Search className="h-8 w-8 text-stone-300 dark:text-stone-600" /> : <Bookmark className="h-8 w-8 text-stone-300 dark:text-stone-600" />}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                    {searchQuery 
                      ? `Pencarian "${searchQuery}" Tidak Ditemukan`
                      : (filter === 'saved' ? 'Belum Ada Artikel Tersimpan' : 'Artikel Tidak Ditemukan')
                    }
                  </h3>
                  <p className="text-stone-500 dark:text-stone-400 text-sm mb-6">
                    {searchQuery
                      ? 'Coba gunakan kata kunci lain atau periksa ejaan Anda.'
                      : (filter === 'saved' ? 'Artikel yang kamu simpan akan muncul di sini.' : 'Coba ubah filter atau cari artikel lain.')
                    }
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-6 py-2 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold transition hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Reset Pencarian
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. Contact / Join CTA Section */}
          <ScrollReveal delay={0.2}>
            <div className="mt-32 p-12 rounded-[3rem] bg-emerald-900 dark:bg-[#0c3e29] text-white relative overflow-hidden text-center space-y-8">
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <Sparkles className="h-10 w-10 text-emerald-400 mx-auto animate-pulse" />
                <h2 className="text-3xl font-bold tracking-tight">Butuh Bantuan Lebih Lanjut?</h2>
                <p className="text-emerald-100/80 text-base leading-relaxed">
                  Jika artikel di atas membuatmu menyadari sesuatu dan kamu merasa butuh bantuan profesional, tim psikolog kami siap mendampingimu.
                </p>
                <div className="pt-4">
                  <ConsultationCTAButton 
                    className="inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-emerald-900 hover:bg-emerald-50 shadow-xl transition active:scale-95 cursor-pointer hover:scale-[1.02]"
                  >
                    Jadwalkan Konsultasi Kamu
                  </ConsultationCTAButton>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Simple Footer */}
      <footer className="py-12 border-t border-stone-200 dark:border-stone-900">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center space-x-2">
            <div className="relative h-6 w-6 flex items-center justify-center rounded-full overflow-hidden bg-white border border-stone-200">
              <ImageOptimizer
                src={logoNuansa}
                alt="Logo Nuansa"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-bold text-stone-900 dark:text-white">Nuansa Psychology Consulting</span>
          </div>
          <p className="text-[10px] text-stone-400 dark:text-stone-500">&copy; {new Date().getFullYear()} Nuansa Psychology Consulting. Seluruh Hak Cipta Dilindungi.</p>
        </div>
      </footer>
    </main>
  );
}
