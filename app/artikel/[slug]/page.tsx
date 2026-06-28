"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { Toaster, toast } from "sonner";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MIND_ARTICLES } from "@/lib/constants";
import { ARTICLE_DETAILS } from "@/lib/article-content";
import { calculateReadingTime, calculateDetailedReadingTime } from "@/lib/utils";
import { FloatingNav } from "@/components/article/FloatingNav";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContentRenderer } from "@/components/article/ArticleContentRenderer";
import { ArticleFooter } from "@/components/article/ArticleFooter";
import { ArticleFeedback } from "@/components/article/ArticleFeedback";
import { ReadingStatusBadge } from "@/components/article/ReadingStatusBadge";
import { useTheme } from "@/components/ThemeProvider";
import { useBookmarks } from "@/hooks/useBookmarks";
import { SITE_URL } from "@/lib/metadata";
import { getGlossaryTermsInText } from "@/lib/glossary";

// Lazy-loaded print modal for optimal performance and smaller initial JS bundle
const PrintPreviewModal = dynamic(() => import("./PrintPreviewModal"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-stone-900/80 backdrop-blur-md p-4">
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 max-w-sm w-full text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-800 mx-auto" />
        <p className="text-sm font-bold text-stone-800 dark:text-stone-200">Memuat modul cetak...</p>
      </div>
    </div>
  ),
});


export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = MIND_ARTICLES.find((a) => a.slug === slug);
  const detail = ARTICLE_DETAILS[slug];

  const { isBookmarked: checkBookmarked, toggleBookmark: toggleSaved, mounted: bookmarksMounted } = useBookmarks();
  const isBookmarked = checkBookmarked(slug);

  const breadcrumbItems = useMemo(() => [
    { label: "Home", href: "/" },
    { label: "Artikel", href: "/artikel" },
    { label: article?.title || "Detail Artikel" },
  ], [article?.title]);

  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const { isDark, toggleTheme, mounted } = useTheme();
  
  const readingInfo = useMemo(() => detail?.content 
    ? calculateDetailedReadingTime(detail.content)
    : { text: article?.readTime || "1 Menit", wordCount: 0 }, [detail, article]);

  const readingTime = readingInfo.text;
  const wordCount = readingInfo.wordCount;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001
  });

  const toggleBookmark = () => {
    toggleSaved(slug);
    if (isBookmarked) {
      toast.success("Artikel dihapus dari daftar tersimpan", {
        duration: 2000,
      });
    } else {
      toast.success("Artikel berhasil disimpan", {
        description: article?.title,
        duration: 2000,
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link disalin ke clipboard", { duration: 1500 });
    }
  };

  const handlePrint = () => {
    setShowPrintPreview(true);
  };

  const executeActualPrint = () => {
    if (typeof window !== "undefined") {
      toast.info("Menyiapkan dokumen untuk dicetak...", { duration: 2000 });
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };

  // Related Articles
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return MIND_ARTICLES
      .filter((a) => a.category === article.category && a.slug !== slug)
      .slice(0, 2);
  }, [article, slug]);

  // JSON-LD Structured Data for BlogPosting
  const blogPostingSchema = useMemo(() => {
    if (!article) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://nuansaconsulting.com/artikel/${slug}`
      },
      "headline": article.title,
      "description": article.excerpt,
      "image": "https://nuansaconsulting.com/banner-nuansa.png",
      "datePublished": "2026-06-23T08:00:00+07:00",
      "dateModified": "2026-06-23T08:00:00+07:00",
      "author": {
        "@type": "Organization",
        "name": "Psikolog Nuansa",
        "url": "https://nuansaconsulting.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Nuansa Psychology Consulting",
        "url": "https://nuansaconsulting.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://nuansaconsulting.com/banner-nuansa.png"
        }
      }
    };
  }, [article, slug]);

  // JSON-LD Structured Data for BreadcrumbList
  const breadcrumbSchema = useMemo(() => {
    if (!article) return null;
    return {
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
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": article.title,
          "item": `https://nuansaconsulting.com/artikel/${slug}`
        }
      ]
    };
  }, [article, slug]);

  // JSON-LD Structured Data for FAQPage (Glossary)
  const faqSchema = useMemo(() => {
    if (!detail?.content) return null;
    
    // Extract text from detail.content
    const allText = detail.content.map(block => {
      let blockText = block.text || "";
      if (block.items) {
        blockText += " " + block.items.join(" ");
      }
      return blockText;
    }).join(" ");

    const glossaryTerms = getGlossaryTermsInText(allText);

    if (glossaryTerms.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": glossaryTerms.map(term => ({
        "@type": "Question",
        "name": `Apa yang dimaksud dengan ${term.term} dalam psikologi?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": term.definition
        }
      }))
    };
  }, [detail]);

  if (!article) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-stone-900">Artikel Tidak Ditemukan</h1>
        <p className="text-stone-500">Mohon maaf, artikel yang Anda cari tidak tersedia.</p>
        <Link href="/artikel" className="text-emerald-800 font-bold hover:underline">Kembali ke Daftar Artikel</Link>
      </div>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-emerald-100 dark:selection:bg-emerald-950/50 selection:text-emerald-900 dark:selection:text-emerald-300 transition-colors duration-200">
      <Toaster position="top-center" richColors />
      
      {/* Print Preview Modal */}
      <AnimatePresence>
        {showPrintPreview && (
          <PrintPreviewModal 
            isOpen={showPrintPreview}
            onClose={() => setShowPrintPreview(false)}
            onPrint={executeActualPrint}
            article={article}
            detail={detail}
            readingTime={readingTime}
            wordCount={wordCount}
          />
        )}
      </AnimatePresence>
      {/* SEO Meta Tags (Hoisted by React 19 / Next 15) */}
      <title>{`${article.title} | Nuansa Psychology Consulting`}</title>
      <meta name="description" content={article.excerpt} />
      <meta name="keywords" content={`${article.category}, kesehatan mental, psikologi, konseling, tangerang, ${article.title}`} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={`${SITE_URL}/artikel/${slug}`} />
      <meta property="og:title" content={`${article.title} | Nuansa Psychology Consulting`} />
      <meta property="og:description" content={article.excerpt} />
      <meta property="og:image" content={`${SITE_URL}/banner-nuansa.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${SITE_URL}/artikel/${slug}`} />
      <meta name="twitter:title" content={`${article.title} | Nuansa Psychology Consulting`} />
      <meta name="twitter:description" content={article.excerpt} />
      <meta name="twitter:image" content={`${SITE_URL}/banner-nuansa.png`} />

      {/* Canonical URL SEO Tag */}
      <link rel="canonical" href={`${SITE_URL}/artikel/${slug}`} />

      {/* JSON-LD BlogPosting Structured Data Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* JSON-LD BreadcrumbList Structured Data Tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* JSON-LD FAQPage Structured Data Tag (Glossary terms) */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-600 z-[100] origin-left no-print"
        style={{ scaleX }}
      />
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print, nav, footer, button, .consultation-cta, .related-articles, .scroll-progress, .article-sidebar {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: #1c1917 !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            height: auto !important;
          }
          .print-modal-overlay {
            position: absolute !important;
            inset: 0 !important;
            height: auto !important;
            min-height: 100vh !important;
            background: white !important;
            display: block !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .print-modal-content {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            height: auto !important;
            width: 100% !important;
            max-width: 100% !important;
            display: block !important;
            overflow: visible !important;
            background: white !important;
          }
          .print-modal-scroll {
            overflow: visible !important;
            height: auto !important;
            background: white !important;
            padding: 0 !important;
          }
          .print-document {
            width: 100% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
          }
          
          /* Hide main article if modal is open */
          .main-article-content {
            display: none !important;
          }
        }
        
        .print-document {
          color: #1c1917 !important;
          background-color: white !important;
        }
        .print-document h1, .print-document h2, .print-document h3 {
          color: #1c1917 !important;
          page-break-after: avoid;
        }
        .print-document p, .print-document li, .print-document img, .print-document .takeaway-box {
          page-break-inside: avoid;
        }
        .print-document h2 {
          border-bottom-color: #f1f1f1 !important;
        }
      ` }} />
      
      <div className={showPrintPreview ? "main-article-content" : ""}>
        <FloatingNav 
          toggleTheme={toggleTheme}
          isDark={isDark}
          mounted={mounted}
          isBookmarked={isBookmarked}
          toggleBookmark={toggleBookmark}
          handleShare={handleShare}
          handlePrint={handlePrint}
        />

        <motion.article 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pt-32 pb-24 px-6 mx-auto max-w-3xl article-container"
        >
          <ArticleHeader 
            article={article}
            readingTime={readingTime}
            wordCount={wordCount}
            breadcrumbItems={breadcrumbItems}
            slug={slug}
          />

          <ArticleContentRenderer 
            slug={slug}
            detail={detail}
            excerpt={article.excerpt}
          />

          <ArticleFeedback />

          <ArticleFooter 
            relatedArticles={relatedArticles}
            articleTitle={article.title}
          />
        </motion.article>
      </div>
    </main>
  );
}
