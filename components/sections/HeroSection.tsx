"use client";
import React from "react";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { SITE_METADATA } from "@/lib/constants";
import imgSanti from "@/src/assets/images/tim-nuansa/santi.webp";
import { SIPPBadge, RatingStars } from "@/components/ui/StatusIcons";
import { ScrollReveal, TiltCard } from "@/components/ui/Animations";
import { StaggeredBadge } from "@/components/ui/Misc";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

interface HeroSectionProps {
  setCursorLabel: (label: string | null) => void;
}

export function HeroSection({ setCursorLabel }: HeroSectionProps) {
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden py-14 lg:py-24 bg-stone-50 dark:bg-[#121211] group/hero"
      onMouseEnter={() => setCursorLabel("Explore")}
      onMouseLeave={() => setCursorLabel(null)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
      }}
    >
      {/* Dynamic Light Spotlight Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 z-0">
        <div 
          className="absolute inset-0 bg-[radial-gradient(600px_at_var(--mouse-x)_var(--mouse-y),rgba(16,185,129,0.06),transparent_80%)]" 
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <div className="lg:col-span-7 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/10 dark:border-emerald-950/40 bg-emerald-50 dark:bg-emerald-950/25 px-3.5 py-1.5 text-emerald-800 dark:text-emerald-400 text-xs font-semibold"
          >
            <Sparkles className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400 animate-pulse" />
            <span>{SITE_METADATA.name} — Berdiri Sejak Tahun {SITE_METADATA.foundedYear}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="font-sans text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-stone-950 dark:text-white leading-[1.1]"
          >
            Setiap Masalah <span className="text-emerald-700 dark:text-emerald-400">Pasti Ada Jalan Keluarnya</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="font-sans text-base lg:text-lg text-stone-850 dark:text-stone-200 leading-relaxed max-w-xl"
          >
            Kami hadir sebagai sahabat cerita dan mitra profesional untuk mendampingimu mengelola emosi, membimbing tumbuh kembang buah hati, hingga mengenali potensi unik dalam dirimu.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: "easeOut" }}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
          >
            <PrimaryButton href="/reservasi">
              Reservasi Jadwal Konseling
              <ArrowRight className="ml-2 h-4 w-4" />
            </PrimaryButton>
            <SecondaryButton href="#layanan">
              Pelajari Layanan Kami
            </SecondaryButton>
          </motion.div>

          {/* Credibility Badges & Numbers */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="pt-8 grid grid-cols-3 gap-6 border-t border-stone-200 dark:border-stone-850"
          >
            <div>
              <span className="block text-2xl font-bold tracking-tight text-emerald-850 dark:text-emerald-400">{new Date().getFullYear() - SITE_METADATA.foundedYear} Tahun</span>
              <span className="block text-xs text-stone-750 dark:text-stone-300 mt-1">Eksistensi Layanan Komunitas</span>
            </div>
            <div>
              <span className="block text-2xl font-bold tracking-tight text-emerald-850 dark:text-emerald-400">HIMPSI</span>
              <span className="block text-xs text-stone-750 dark:text-stone-300 mt-1">Psikolog Berlisensi Resmi</span>
            </div>
            <div>
              <span className="block text-2xl font-bold tracking-tight text-emerald-850 dark:text-emerald-400">100% Secure</span>
              <span className="block text-xs text-stone-750 dark:text-stone-300 mt-1">Jaminan Kerahasiaan SIPP</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Image Mockup - Santi Meliyanti, M.Psi, Psikolog (Pendiri Nuansa Psychology Consulting) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 relative"
        >
          <div className="absolute inset-0 bg-emerald-800/10 rounded-3xl blur-2xl transform translate-x-4 translate-y-3"></div>
          <TiltCard className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-stone-900 bg-stone-50 dark:bg-stone-900 block cursor-default group/sipp">
            <div className="aspect-[3/4] relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden">
                <ImageOptimizer
                  src={imgSanti}
                  alt="Santi Meliyanti, M.Psi, Psikolog - Pendiri Nuansa Psychology Consulting"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                  priority
                />
              {/* Visual subtle vignetting of the bottom to make the card text pop even more gracefully */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent"></div>
            </div>
            <SIPPBadge />
            
            {/* Premium Floating Portrait Identity Badge */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 dark:bg-stone-950/95 p-3 shadow-lg backdrop-blur-md border border-stone-100 dark:border-stone-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="space-y-0.5">
                <StaggeredBadge delay={0.4} className="inline-flex items-center space-x-1 px-1.5 py-0 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-[8px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                  Pendiri & Psikolog Utama
                </StaggeredBadge>
                <h2 className="block text-xs sm:text-sm font-bold text-stone-900 dark:text-white leading-tight">
                  Santi Meliyanti, M.Psi, Psikolog
                </h2>
                <span className="block text-[10px] font-medium text-stone-700 dark:text-stone-300">
                  SIPP Aktif / HIMPSI Terdaftar Resmi
                </span>
              </div>
              <div className="flex flex-col items-start sm:items-end justify-center shrink-0 border-t sm:border-t-0 pt-1.5 sm:pt-0 border-stone-100 dark:border-stone-800">
                <span className="text-[9px] sm:text-[10px] text-emerald-850 dark:text-emerald-400 font-bold tracking-wide">Nuansa Psychology</span>
                <div className="flex space-x-0.5 mt-0.5">
                  <RatingStars delay={0.6} />
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

      </div>
    </section>
  );
}
