"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQ_ITEMS: Record<string, { question: string; answer: string }[]> = {
  "mengelola-burnout-tekanan-kerja": [
    { question: "Berapa lama waktu ideal untuk melakukan micro-break?", answer: "Micro-break idealnya dilakukan selama 3-5 menit setiap 1-2 jam sekali. Fokuskan pada aktivitas yang menjauhkan mata dari layar dan merilekskan otot, seperti peregangan ringan atau memejamkan mata." },
    { question: "Apakah burnout sama dengan stres biasa?", answer: "Tidak. Stres biasanya berupa perasaan kewalahan atau terlalu banyak tekanan. Burnout adalah kondisi kelelahan emosional, mental, dan fisik akibat stres berkepanjangan yang tidak terkelola, sering ditandai dengan sinisme dan perasaan tidak berdaya." }
  ],
  "komunikasi-asertif-keluarga": [
    { question: "Bagaimana cara memulai komunikasi asertif jika sebelumnya selalu pasif?", answer: "Mulai dari hal-hal kecil. Gunakan pernyataan 'Saya merasa...' alih-alih menuduh 'Kamu selalu...'. Latih juga untuk berani mengatakan 'Tidak' pada permintaan sederhana tanpa merasa bersalah." },
    { question: "Apa bedanya asertif dan agresif?", answer: "Asertif adalah menyampaikan kebutuhan dan perasaan secara jujur tanpa merendahkan atau menyakiti hak orang lain. Agresif cenderung memaksakan kehendak dan tidak memperdulikan perasaan orang lain." }
  ],
  "menghargai-emosi-negatif": [
    { question: "Berapa lama batas normal merasakan emosi negatif?", answer: "Tidak ada batasan waktu yang pasti. Namun, jika emosi negatif tersebut terus menerus mengganggu aktivitas sehari-hari selama lebih dari 2 minggu berturut-turut, disarankan untuk berkonsultasi dengan profesional." },
    { question: "Bagaimana cara tidak tenggelam dalam kesedihan?", answer: "Sadari dan terima kesedihan tersebut tanpa menghakiminya. Batasi waktu untuk merenung (misal 15 menit), lalu alihkan fokus dengan melakukan aktivitas fisik ringan atau menulis jurnal." }
  ],
  "default": [
    { question: "Kapan saat yang tepat untuk berkonsultasi ke psikolog?", answer: "Saat Anda merasa kesulitan mengelola emosi, menghadapi masalah yang terus berulang dan mengganggu fungsi kehidupan sehari-hari (tidur, nafsu makan, pekerjaan, atau relasi), atau sekadar butuh ruang aman untuk bercerita tanpa dihakimi." },
    { question: "Apakah sesi konseling dijamin kerahasiaannya?", answer: "Tentu. Psikolog profesional di Nuansa Psychology Consulting terikat pada kode etik untuk menjaga penuh kerahasiaan identitas dan cerita klien, kecuali ada ancaman keselamatan jiwa." }
  ]
};

export function FAQAccordion({ slug }: { slug: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = FAQ_ITEMS[slug] || FAQ_ITEMS["default"];

  if (!items || items.length === 0) return null;

  return (
    <div className="my-12">
      <div className="flex items-center space-x-2 mb-6 text-stone-900 dark:text-white">
        <HelpCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />
        <h3 className="text-xl md:text-2xl font-bold">Pertanyaan yang Sering Diajukan</h3>
      </div>
      
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                isOpen 
                  ? "border-emerald-200 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm" 
                  : "border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/50 hover:bg-stone-50 dark:hover:bg-stone-800/50"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className={`font-semibold text-sm md:text-base pr-4 ${isOpen ? "text-emerald-800 dark:text-emerald-400" : "text-stone-700 dark:text-stone-300"}`}>
                  {item.question}
                </span>
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "text-emerald-600 dark:text-emerald-500 rotate-180" : "text-stone-400 dark:text-stone-500"}`} />
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-sm md:text-base text-stone-600 dark:text-stone-400 leading-relaxed border-t border-emerald-100/50 dark:border-emerald-900/20">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
