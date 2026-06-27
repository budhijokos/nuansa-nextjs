import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { ArticleContentBlock } from "@/types/article";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(content: ArticleContentBlock[]): number {
  if (!content) return 0;
  
  const text = content.reduce((acc, item) => {
    if (item.text) return acc + " " + item.text;
    if (item.items) return acc + " " + item.items.join(" ");
    return acc;
  }, "");

  const wordsPerMinute = 200;
  const noOfWords = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

/**
 * Calculates a precise reading time including seconds and word count.
 */
export function calculateDetailedReadingTime(content: ArticleContentBlock[]) {
  if (!content || content.length === 0) return { text: "1 Menit", wordCount: 0 };
  
  const text = content.reduce((acc, item) => {
    if (item.text) return acc + " " + item.text;
    if (item.items) return acc + " " + item.items.join(" ");
    return acc;
  }, "");

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const wordsPerMinute = 200; 
  
  const totalSeconds = Math.ceil((wordCount / wordsPerMinute) * 60);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  let timeText = "";
  if (minutes === 0) {
    timeText = `${seconds} Detik`;
  } else if (seconds === 0) {
    timeText = `${minutes} Menit`;
  } else {
    timeText = `${minutes} Menit ${seconds} Detik`;
  }

  return { text: timeText, wordCount };
}

export function getArticleImageUrl(slug: string, imageSeed?: string, width = 800, height = 600): string {
  // Map of manual seeds for articles if not provided in MIND_ARTICLES
  const seedMap: Record<string, string> = {
    "mengelola-burnout-tekanan-kerja": "burnout",
    "komunikasi-asertif-keluarga": "family",
    "menghargai-emosi-negatif": "emotions",
    "membangun-boundaries-sehat": "boundaries",
    "psikologi-pola-asuh-positif": "parenting",
    "memutus-rantai-overthinking": "overthinking",
    "meditasi-lima-menit": "meditation",
    "menjaga-keintiman-pernikahan": "marriage",
    "seni-bangkit-dari-kegagalan": "resilience",
    "tidur-dan-stabilitas-emosi": "sleep"
  };

  const seed = imageSeed || seedMap[slug] || "nature";
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}
