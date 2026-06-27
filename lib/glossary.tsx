// lib/glossary.ts

import React from "react";
import { GlossaryTooltip } from "@/components/GlossaryTooltip";

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export const PSYCHOLOGY_GLOSSARY: GlossaryTerm[] = [
  {
    term: "Burnout",
    definition: "Kondisi kelelahan fisik, mental, dan emosional akibat stres kronis di tempat kerja yang tidak dikelola dengan baik."
  },
  {
    term: "Mindfulness",
    definition: "Kesadaran penuh akan momen saat ini, termasuk pikiran dan perasaan, tanpa memberikan penilaian atau penghakiman."
  },
  {
    term: "Anxiety",
    definition: "Perasaan cemas, gelisah, atau takut yang berlebihan terhadap situasi masa depan atau ancaman yang dirasakan."
  },
  {
    term: "Kognitif",
    definition: "Berhubungan dengan proses mental tingkat tinggi seperti pemikiran, ingatan, persepsi, dan pengambilan keputusan."
  },
  {
    term: "Sistem Saraf Parasimpatis",
    definition: "Bagian dari sistem saraf otonom yang berfungsi menenangkan tubuh, menurunkan detak jantung, dan membantu pemulihan setelah stres."
  },
  {
    term: "Amigdala",
    definition: "Bagian kecil di otak yang berfungsi sebagai pusat pengolahan emosi, terutama respons terhadap rasa takut dan ancaman."
  },
  {
    term: "Resiliensi",
    definition: "Kemampuan psikologis seseorang untuk bangkit kembali dan beradaptasi secara positif setelah mengalami kesulitan atau trauma."
  },
  {
    term: "Boundaries",
    definition: "Batasan sehat yang ditetapkan seseorang untuk melindungi ruang fisik, emosional, dan mentalnya dalam berinteraksi dengan orang lain."
  },
  {
    term: "Asertif",
    definition: "Gaya komunikasi di mana seseorang mampu mengekspresikan kebutuhan dan perasaannya secara jujur dan langsung namun tetap menghargai orang lain."
  },
  {
    term: "Toxic Positivity",
    definition: "Keyakinan berlebihan bahwa seseorang harus selalu berpikir positif dan menekan emosi negatif apa pun situasinya."
  },
  {
    term: "Emotional Suppression",
    definition: "Tindakan menekan atau menyembunyikan emosi yang dirasakan secara sadar, yang seringkali berdampak buruk pada kesehatan mental."
  },
  {
    term: "Psikosomatis",
    definition: "Gejala fisik nyata (seperti sakit kepala atau lambung) yang muncul atau diperburuk oleh faktor psikologis seperti stres atau kecemasan."
  },
  {
    term: "Regulasi Emosi",
    definition: "Kemampuan seseorang untuk mengenali, memproses, dan merespons pengalaman emosional secara adaptif dan terkendali."
  },
  {
    term: "Korteks Prefrontal",
    definition: "Bagian depan otak yang bertanggung jawab atas fungsi eksekutif, perencanaan, kontrol diri, dan pengambilan keputusan rasional."
  },
  {
    term: "Neurobiologi",
    definition: "Cabang ilmu biologi yang mempelajari struktur dan fungsi sistem saraf serta hubungannya dengan perilaku dan proses mental."
  },
  {
    term: "Amygdala Hijack",
    definition: "Situasi di mana amigdala mengambil alih kendali otak sebelum bagian rasional sempat memproses informasi, sering memicu reaksi emosional hebat."
  },
  {
    term: "Ruminasi",
    definition: "Kecenderungan untuk memikirkan atau merenungkan pikiran negatif secara berulang-ulang tanpa disertai upaya mencari solusi."
  },
  {
    term: "Overthinking",
    definition: "Kebiasaan menganalisis sesuatu secara berlebihan atau terus-menerus mengkhawatirkan kemungkinan buruk hingga menghambat pengambilan keputusan."
  },
  {
    term: "Insomnia",
    definition: "Gangguan tidur yang ditandai dengan kesulitan untuk memulai tidur, mempertahankan tidur, atau mendapatkan tidur yang berkualitas."
  },
  {
    term: "Grounding",
    definition: "Teknik sensorik sederhana yang digunakan untuk mengalihkan fokus dari pikiran yang mencemaskan kembali ke realitas saat ini."
  }
];

export function getGlossaryTermsInText(text: string): GlossaryTerm[] {
  const sortedGlossary = [...PSYCHOLOGY_GLOSSARY].sort((a, b) => b.term.length - a.term.length);
  const termsRegex = new RegExp(`\\b(${sortedGlossary.map(g => escapeRegExp(g.term)).join('|')})\\b`, 'gi');
  
  const matchedTerms = new Set<string>();
  let match;
  while ((match = termsRegex.exec(text)) !== null) {
    matchedTerms.add(match[0].toLowerCase());
  }

  return sortedGlossary.filter(g => matchedTerms.has(g.term.toLowerCase()));
}

export function enhanceTextWithGlossary(text: string | React.ReactNode): React.ReactNode {
  if (typeof text !== "string") return text;

  // Sort glossary terms by length descending to match longer terms first
  const sortedGlossary = [...PSYCHOLOGY_GLOSSARY].sort((a, b) => b.term.length - a.term.length);
  
  // Create a regex that matches any of the terms (case-insensitive)
  const termsRegex = new RegExp(`\\b(${sortedGlossary.map(g => escapeRegExp(g.term)).join('|')})\\b`, 'gi');

  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = termsRegex.exec(text)) !== null) {
    const matchIndex = match.index;
    const matchedTerm = match[0];
    
    // Find the original term definition (case-insensitive lookup)
    const glossaryEntry = sortedGlossary.find(g => g.term.toLowerCase() === matchedTerm.toLowerCase());

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }

    if (glossaryEntry) {
      parts.push(
        <GlossaryTooltip key={`glossary-${matchIndex}`} term={glossaryEntry.term} definition={glossaryEntry.definition}>
          {matchedTerm}
        </GlossaryTooltip>
      );
    } else {
      parts.push(matchedTerm);
    }

    lastIndex = termsRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
