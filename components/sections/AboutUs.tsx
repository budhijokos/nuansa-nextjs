"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, Shield, Heart, Clock, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ui/Animations";
import { HistoryTimeline } from "@/components/ui/Misc";

import { WHY_CHOOSE_US } from "@/lib/about-data";
import { SITE_METADATA } from "@/lib/constants";

import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";

export function AboutUs() {
  return (
    <SectionWrapper 
      className="bg-stone-100 dark:bg-[#121211] border-y border-stone-200/50 dark:border-stone-850"
      showHeader={false}
    >
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 xl:col-span-6 space-y-8">
            <SectionHeader 
              align="left"
              badge="Profil Lembaga"
              title={`${SITE_METADATA.name}`}
              description=""
              className="!mb-0"
            />
            <div className="text-stone-600 dark:text-stone-350 font-medium text-2xl !mt-2">
              Didedikasikan sejak tahun {SITE_METADATA.foundedYear}
            </div>
            <p className="text-stone-800 dark:text-stone-200 text-base leading-relaxed max-w-xl">
              {SITE_METADATA.name} pertama kali diprakarsai oleh psikolog ahli **Bunda Santi Meliyanti** pada akhir {SITE_METADATA.foundedYear}. Kami terus berinovasi mendukung kesehatan mental masyarakat Indonesia dengan standar klinis yang tinggi.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-start space-x-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="block font-bold text-stone-900 dark:text-white text-sm">Cita-cita Kami</span>
                  <p className="text-xs md:text-base text-stone-700 dark:text-stone-300 mt-1">Kami ingin menjadi tempat ternyaman bagi setiap orang untuk bercerita dan bertumbuh menjadi pribadi yang lebih tangguh.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 mt-0.5">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="block font-bold text-stone-900 dark:text-white text-sm">Langkah Nyata Kami</span>
                  <p className="text-xs md:text-base text-stone-700 dark:text-stone-300 mt-1">Memberikan pendampingan tulus bagi individu, keluarga, sekolah, maupun perusahaan dengan solusi yang praktis dan penuh empati.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-6 bg-white dark:bg-stone-900 rounded-2xl p-6 lg:p-8 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400 block mb-2">Mengapa Memilih Kami?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WHY_CHOOSE_US.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="space-y-2 bg-stone-50/50 dark:bg-stone-950/40 hover:bg-white dark:hover:bg-stone-900/60 p-4 rounded-xl border border-stone-150/50 dark:border-stone-850/60 hover:border-emerald-700/10 dark:hover:border-emerald-500/20 transition-all duration-150 shadow-sm cursor-default"
                  >
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white flex items-center">
                      <Icon className="h-4.5 w-4.5 text-emerald-700 dark:text-emerald-400 mr-2" />
                      {feature.title}
                    </h4>
                    <p className="text-xs md:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </ScrollReveal>

      {/* Timeline part with standard SectionHeader */}
      <div className="mt-24 lg:mt-32">
        <SectionHeader 
          badge="Perjalanan Kami"
          title="Sedikit Cerita Tentang Perjalanan Kami"
          description="Bagaimana kami terus belajar dan bertumbuh untuk menjadi tempat ceritamu yang paling terpercaya."
          className="mb-16"
        />
        
        <HistoryTimeline />
      </div>
    </SectionWrapper>
  );
}
