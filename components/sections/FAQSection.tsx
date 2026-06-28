"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/Animations";
import { FAQS_DATA } from "@/lib/faq-data";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function FAQSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS_DATA.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <SectionWrapper 
      className="bg-stone-100 dark:bg-[#1c1c1a] border-y border-stone-200/50 dark:border-stone-850"
      containerClassName="max-w-4xl"
      badge="Sering Ditanyakan"
      title="Prosedur Sesi & FAQ"
      description="Berikut adalah beberapa informasi penting tata cara berkonsultasi, waktu bimbingan, pembayaran, serta rute menuju klinik kami di Tangerang."
    >
      {/* FAQPage Structured Data Dynamic Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-4">
        {FAQS_DATA.map((faq, idx) => (
          <div key={idx} className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left text-sm md:text-base font-bold text-stone-900 dark:text-white focus:outline-none"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`h-4 w-4 text-emerald-800 dark:text-emerald-400 transform transition-transform duration-150 ${activeFaq === idx ? "rotate-180" : ""}`} />
            </button>
            {activeFaq === idx && (
              <div className="px-5 pb-5 pt-1 text-xs md:text-base text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-50 dark:border-stone-850">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
