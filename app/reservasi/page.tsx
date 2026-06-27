"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft,
  Copy, 
  Share2, 
  Check, 
  Sun, 
  Moon,
  ChevronRight
} from "lucide-react";
import { toast, Toaster } from "sonner";
import { useTheme } from "@/components/ThemeProvider";
import { ReservationForm } from "@/components/reservation/ReservationForm";
import { Footer } from "@/components/sections/Footer";
import logoNuansa from "@/src/assets/images/logo-nuansa/logo-nuansa.webp";

export default function StandaloneReservasiPage() {
  const { isDark, toggleTheme, mounted } = useTheme();
  
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const url = "https://nuansaconsulting.com/reservasi";
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopied(true);
        toast.success("Link formulir berhasil disalin!");
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Gagal menyalin link", err);
        toast.error("Gagal menyalin link");
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Reservasi Nuansa Psychology Consulting",
        text: "Daftar sesi konseling dan layanan psikologi secara mudah di Nuansa.",
        url: typeof window !== "undefined" ? window.location.href : "https://nuansaconsulting.com/reservasi",
      }).catch(console.error);
    } else {
      handleCopyLink();
    }
  };

  return (
    <main id="main-content" className="min-h-screen bg-stone-50 dark:bg-stone-950 font-sans text-stone-900 dark:text-stone-100 selection:bg-emerald-100 dark:selection:bg-emerald-950/50 selection:text-emerald-900 dark:selection:text-emerald-300 transition-colors duration-200">
      <Toaster position="top-center" richColors />
      
      {/* SEO Meta Tags (Hoisted by React 19 / Next 15) */}
      <title>Formulir Reservasi Jadwal & Janji Temu | Nuansa Psychology Consulting</title>
      <meta name="description" content="Daftarkan janji temu sesi konseling psikologi, layanan tes IQ/bakat minat perorangan maupun kelompok, serta konsultasi tumbuh kembang anak secara mudah di bawah jaminan kerahasiaan HIMPSI." />
      <meta name="keywords" content="Reservasi Psikolog Tangerang, Booking Konseling, Daftar Tes IQ, Janji Temu Psikolog, Nuansa Psychology Consulting" />
      <link rel="canonical" href="https://nuansaconsulting.com/reservasi" />
      
      {/* JSON-LD Structured Data Schema.org for Booking/Reservation Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Formulir Reservasi Jadwal & Janji Temu | Nuansa Psychology Consulting",
            "description": "Formulir pendaftaran resmi layanan konseling psikologi, terapi tumbuh kembang anak, tes bakat minat, assessment, dan pelatihan PT Nuansa Daya Persada.",
            "url": "https://nuansaconsulting.com/reservasi",
            "mainEntity": {
              "@type": "MedicalBusiness",
              "name": "Nuansa Psychology Consulting",
              "alternateName": "PT Nuansa Daya Persada",
              "image": "https://nuansaconsulting.com/logo-nuansa.webp",
              "telephone": "+628128453550",
              "email": "layanan@nuansaconsulting.com",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Bugel Mas Indah Jl. Besi IV Blok A17 No. 22, RT.001/RW.005, Bugel, Kec. Karawaci",
                  "addressLocality": "Kota Tangerang",
                  "addressRegion": "Banten",
                  "postalCode": "15113",
                  "addressCountry": "ID"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Jl. Proklamasi No 34, Cimone, Karawaci",
                  "addressLocality": "Tangerang",
                  "addressRegion": "Banten",
                  "postalCode": "15114",
                  "addressCountry": "ID"
                }
              ]
            }
          })
        }}
      />
      
      {/* 1. Header & Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-stone-200 dark:border-stone-900 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full overflow-hidden shadow-md bg-white">
              <ImageOptimizer
                src={logoNuansa}
                alt="Logo Nuansa"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="block font-sans text-base font-bold tracking-tight text-stone-900 dark:text-white leading-none">NUANSA</span>
              <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase mt-1">Psychology Consulting</span>
            </div>
          </Link>
          
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition duration-150 text-stone-600 dark:text-stone-300 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {(mounted && isDark) ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-stone-600" />}
            </button>
            
            <Link 
              href="/" 
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors px-3 py-1.5 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-transparent hover:border-emerald-100 dark:hover:border-emerald-900/30"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Beranda</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Header Section */}
      <section className="pt-28 pb-10 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-850">
        <div className="mx-auto max-w-5xl px-6 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] font-mono"
          >
            <span>Layanan Janji Temu Cepat</span>
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-tight font-sans">
            Formulir Pendaftaran & Reservasi Sesi
          </h1>
          <p className="text-xs md:text-sm text-stone-550 dark:text-stone-350 max-w-2xl mx-auto leading-relaxed">
            Daftarkan janji temu sesi konseling psikologi, layanan tes IQ/bakat minat perorangan maupun kelompok, serta konsultasi tumbuh kembang anak secara mudah di bawah jaminan kerahasiaan HIMPSI.
          </p>

          {/* Social Share & Copy Link Panel */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-stone-50 dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 text-[11px] font-bold border border-stone-200 dark:border-stone-700 shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Salin link formulir reservasi"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-650 dark:text-emerald-450" />
                  <span>Link Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-stone-500 dark:text-stone-400" />
                  <span>Salin Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-900 dark:hover:bg-emerald-600 text-white text-[11px] font-bold shadow-sm transition-all duration-200 cursor-pointer"
              aria-label="Bagikan halaman formulir reservasi"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Bagikan Halaman</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Main Form Section */}
      <section className="py-12 bg-stone-50 dark:bg-stone-950">
        <div className="mx-auto max-w-3xl px-6">
          <div className="bg-white dark:bg-[#1a1a19] rounded-2xl border border-stone-200/80 dark:border-stone-850 shadow-md p-6 sm:p-8">
            
            <ReservationForm />

          </div>

          {/* Guarantee Badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white dark:bg-[#1a1a19] border border-stone-200/60 dark:border-stone-850 shadow-sm space-y-1">
              <span className="block text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-mono">Kode Etik HIMPSI</span>
              <p className="text-[10.5px] text-stone-500 dark:text-stone-400 leading-normal">
                Seluruh rekam data psikologi tersimpan rahasia penuh di bawah sumpah profesi psikologi Indonesia.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#1a1a19] border border-stone-200/60 dark:border-stone-850 shadow-sm space-y-1">
              <span className="block text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-mono">Psikolog SIPP Resmi</span>
              <p className="text-[10.5px] text-stone-500 dark:text-stone-400 leading-normal">
                Ditangani langsung oleh psikolog SIPP aktif berlisensi resmi Ikatan Psikolog Klinis Indonesia.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#1a1a19] border border-stone-200/60 dark:border-stone-850 shadow-sm space-y-1">
              <span className="block text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-widest font-mono">Layanan 1x24 Jam</span>
              <p className="text-[10.5px] text-stone-500 dark:text-stone-400 leading-normal">
                Admin official Nuansa segera memverifikasi ketersediaan jadwal pilihan dalam kurun waktu 1x24 jam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Help Section Footer */}
      <Footer />
    </main>
  );
}
