"use client";

import React from "react";
import { getArticleImage } from "@/lib/image-registry";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";

interface ThemedHeroImageProps {
  slug: string;
  category: string;
  title: string;
  imageUrl?: string;
}

export function ThemedHeroImage({ slug, category, title, imageUrl }: ThemedHeroImageProps) {
  // Map slugs or categories to specific color/mood themes
  const configMap: Record<string, { borderGlow: string; bgGradient: string; textAccent: string }> = {
    "mengelola-burnout-tekanan-kerja": {
      borderGlow: "shadow-emerald-950/20 border-emerald-100",
      bgGradient: "from-emerald-950/10 via-cyan-950/5 to-transparent",
      textAccent: "text-emerald-800"
    },
    "komunikasi-asertif-keluarga": {
      borderGlow: "shadow-orange-950/10 border-orange-100",
      bgGradient: "from-amber-950/5 via-orange-950/5 to-transparent",
      textAccent: "text-amber-700"
    },
    "menghargai-emosi-negatif": {
      borderGlow: "shadow-indigo-950/20 border-indigo-100",
      bgGradient: "from-indigo-950/10 via-slate-950/5 to-transparent",
      textAccent: "text-indigo-800"
    },
    "membangun-boundaries-sehat": {
      borderGlow: "shadow-emerald-950/10 border-teal-100",
      bgGradient: "from-teal-950/5 via-emerald-950/5 to-transparent",
      textAccent: "text-teal-700"
    },
    "psikologi-pola-asuh-positif": {
      borderGlow: "shadow-amber-950/20 border-amber-100",
      bgGradient: "from-yellow-950/5 via-amber-950/5 to-transparent",
      textAccent: "text-amber-800"
    },
    "memutus-rantai-overthinking": {
      borderGlow: "shadow-violet-950/25 border-violet-100",
      bgGradient: "from-violet-950/10 via-purple-950/5 to-transparent",
      textAccent: "text-violet-800"
    },
    "meditasi-lima-menit": {
      borderGlow: "shadow-teal-950/20 border-teal-100",
      bgGradient: "from-teal-950/10 to-transparent",
      textAccent: "text-teal-800"
    },
    "menjaga-keintiman-pernikahan": {
      borderGlow: "shadow-rose-950/15 border-rose-100",
      bgGradient: "from-rose-950/5 via-pink-950/5 to-transparent",
      textAccent: "text-rose-700"
    },
    "seni-bangkit-dari-kegagalan": {
      borderGlow: "shadow-green-950/15 border-emerald-100",
      bgGradient: "from-emerald-950/5 via-green-950/5 to-transparent",
      textAccent: "text-emerald-700"
    },
    "tidur-dan-stabilitas-emosi": {
      borderGlow: "shadow-sky-950/20 border-sky-100",
      bgGradient: "from-sky-950/10 via-indigo-950/10 to-transparent",
      textAccent: "text-sky-800"
    }
  };

  const currentTheme = configMap[slug] || {
    borderGlow: "shadow-stone-900/10 border-stone-200",
    bgGradient: "from-stone-900/5 to-transparent",
    textAccent: "text-stone-800"
  };

  const finalImageUrl = imageUrl || getArticleImage(slug, category);

  return (
    <div className="w-full space-y-4 mb-10">
      <div className={`relative aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] border ${currentTheme.borderGlow} shadow-xl`}>
        {/* Ambient background blur accent */}
        <div className={`absolute inset-0 bg-gradient-to-tr ${currentTheme.bgGradient} mix-blend-multiply pointer-events-none z-10`} />
        <ImageOptimizer
          src={finalImageUrl}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1200px"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Subtle category float badge */}
        <div className="absolute bottom-6 left-6 z-20 backdrop-blur-md bg-stone-900/40 border border-white/10 text-white rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-widest leading-none">
          {category}
        </div>
      </div>
    </div>
  );
}
