"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ArticleData } from "@/types/article";
import { enhanceTextWithGlossary } from "@/lib/glossary";
import { 
  InteractiveBreathGuide, 
  SelfReflectionQuiz, 
  KeyTakeawaysBox, 
  FAQAccordion 
} from "@/components/InteractiveArticleElements";
import { ARTICLE_ADVICE, defaultAdvice } from "@/lib/article-advice";

interface ArticleContentRendererProps {
  slug: string;
  detail?: ArticleData;
  excerpt: string;
}

function renderTextWithLinks(text: string) {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [_, linkText, url] = match;
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      parts.push(enhanceTextWithGlossary(text.substring(lastIndex, matchIndex)));
    }

    if (url.startsWith('/')) {
      parts.push(
        <Link 
          key={matchIndex} 
          href={url} 
          className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline decoration-emerald-500/30 underline-offset-4"
        >
          {linkText}
        </Link>
      );
    } else {
      parts.push(
        <a 
          key={matchIndex} 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline decoration-emerald-500/30 underline-offset-4"
        >
          {linkText}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(enhanceTextWithGlossary(text.substring(lastIndex)));
  }

  return parts.length > 0 ? parts : enhanceTextWithGlossary(text);
}

export function ArticleContentRenderer({ slug, detail, excerpt }: ArticleContentRendererProps) {
  const advice = ARTICLE_ADVICE[slug] || defaultAdvice;

  return (
    <div className="prose prose-stone prose-lg max-w-none space-y-6 text-stone-600 dark:text-stone-300 dark:prose-invert leading-relaxed">
      {detail ? (
        (() => {
          const midPoint = Math.floor(detail.content.length / 2);
          return detail.content.map((item, idx) => {
            const els = [];
            if (item.type === "h2") {
              els.push(<h2 key={`h2-${idx}`} className="text-2xl font-bold text-stone-900 dark:text-white pt-6">{item.text}</h2>);
            } else if (item.type === "p") {
              els.push(<p key={`p-${idx}`}>{renderTextWithLinks(item.text || "")}</p>);
            } else if (item.type === "ul") {
              els.push(
                <ul key={`ul-${idx}`} className="space-y-3 list-none pl-0 my-8">
                  {item.items?.map((li, lidx) => (
                    <li key={lidx} className="flex items-start space-x-3 text-stone-600 dark:text-stone-300">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-2.5 shrink-0" />
                      <span>{renderTextWithLinks(li)}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            
            // Render Self-Reflection Quiz right in the middle
            if (idx === midPoint) {
              els.push(<SelfReflectionQuiz key="mid-reflection-quiz" slug={slug} />);
            }
            return els;
          });
        })()
      ) : (
        <>
          <p className="text-xl font-medium text-stone-800 dark:text-stone-200 leading-relaxed italic border-l-4 border-emerald-800 dark:border-emerald-700 pl-6 my-10">
            &ldquo;{excerpt}&rdquo;
          </p>
          <p className="text-stone-600 dark:text-stone-300">
            Konten lengkap untuk artikel ini sedang dalam tahap penyusunan oleh tim pakar kami. Mohon kembali dalam beberapa saat untuk mendapatkan wawasan batin yang mendalam.
          </p>
        </>
      )}

      {/* Interactive Breath Guide (Specifically for Burnout/Meditation articles) */}
      {(slug === "mengelola-burnout-tekanan-kerja" || slug === "meditasi-lima-menit") && (
        <InteractiveBreathGuide />
      )}

      {/* Key Takeaways Box Recap */}
      <KeyTakeawaysBox slug={slug} />

      {/* FAQ Accordion Section */}
      <FAQAccordion slug={slug} />

      {/* Dynamic Engagement Section */}
      <div className="my-12 p-8 bg-emerald-900 dark:bg-[#0c3e29] rounded-[2rem] text-white">
        <h3 className="text-xl font-bold mb-4 text-emerald-200 dark:text-emerald-350">Pesan Untuk Kamu:</h3>
        <div className="space-y-4">
           <p className="text-emerald-50/80 dark:text-emerald-100/70 italic">
            &ldquo;{advice.quote}&rdquo;
          </p>
          <div className="pt-2 flex items-start space-x-3">
            <Heart className="h-5 w-5 text-emerald-400 dark:text-emerald-300 mt-0.5 shrink-0" />
            <span className="text-sm font-medium">{advice.highlight}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
