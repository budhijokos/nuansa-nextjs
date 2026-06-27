"use client";

import React from "react";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { QuoteBackground } from "@/components/ui/Misc";
import { RatingStars } from "@/components/ui/StatusIcons";

interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
  image?: any;
  isWide?: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  index: number;
}

export function TestimonialCard({
  name,
  role,
  text,
  rating,
  initials,
  image,
  isWide,
  isExpanded,
  onToggleExpand,
  index
}: TestimonialCardProps) {
  const isLong = text.length > 160;
  const displayText = isLong && !isExpanded ? `${text.slice(0, 150)}...` : text;

  return (
    <div 
      className={`bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md transition duration-150 flex flex-col justify-between relative overflow-hidden group ${
        isWide ? "lg:col-span-3 lg:max-w-2xl lg:mx-auto lg:w-full" : ""
      }`}
    >
      <QuoteBackground />
      <div className="space-y-4">
        <div className="flex space-x-1">
          <RatingStars count={rating} className="h-4 w-4" delay={(index % 3) * 0.1 + 0.1} />
        </div>
        <div className="text-xs md:text-sm text-stone-850 dark:text-stone-200 leading-relaxed italic">
          &quot;{displayText}&quot;
          {isLong && (
            <button
              onClick={onToggleExpand}
              className="block mt-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-emerald-300 transition duration-150 cursor-pointer focus:outline-none"
            >
              {isExpanded ? "Sembunyikan ↑" : "Baca Selengkapnya ↓"}
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-3 pt-6 border-t border-stone-100 dark:border-stone-800 mt-4">
        {image ? (
          <div className="h-9 w-9 rounded-full overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-850 border border-stone-100 dark:border-stone-800 shadow-sm relative">
            <ImageOptimizer
              src={image}
              alt={`Foto Testimoni: ${name} - ${role}`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-9 w-9 bg-emerald-50 dark:bg-emerald-950/40 rounded-full flex items-center justify-center font-bold text-xs text-emerald-800 dark:text-emerald-400 shrink-0">
            {initials}
          </div>
        )}
        <div>
          <span className="block text-xs font-bold text-stone-900 dark:text-white">{name}</span>
          <span className="block text-[10px] text-stone-600 dark:text-stone-400 font-semibold tracking-wider uppercase">{role}</span>
        </div>
      </div>
    </div>
  );
}
