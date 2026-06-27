"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Instagram, MapPin, Mail, Phone, MessageCircle, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import logoNuansa from "@/src/assets/images/logo-nuansa/logo-nuansa.webp";

export function Footer() {
  const [showRedirect, setShowRedirect] = useState(false);
  const waUrl = "https://wa.me/628128453550?text=Halo%20Admin%20Nuansa%2C%20saya%20tertarik%20mengikuti%20sesi%20konseling%20atau%20layanan%20bimbingan%20SIPP%20di%20Nuansa.";

  const handleWaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowRedirect(true);

    setTimeout(() => {
      try {
        const newTab = window.open(waUrl, "_blank", "noopener,noreferrer");
        if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
          // If popup is blocked, fall back to current tab redirect
          window.location.href = waUrl;
        }
      } catch (err) {
        console.error("Popup blocked or failed to open", err);
        window.location.href = waUrl;
      }
      setShowRedirect(false);
    }, 2000);
  };
  return (
    <>
      <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300 py-16 border-t border-stone-800 dark:border-stone-900 font-sans">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-9 w-9 flex items-center justify-center rounded-full overflow-hidden bg-white border border-stone-800">
                <ImageOptimizer
                  src={logoNuansa}
                  alt="Logo Resmi Nuansa Psychology Consulting"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <span className="font-sans text-sm font-bold tracking-tight text-white leading-none">Nuansa Psychology Consulting</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Solusi asisten tumbuh kembang anak, pemulihan emosi individu, asesi psikotes formal, serta optimalisasi potensi organisasi terpercaya di Indonesia oleh Nuansa Psychology Consulting.
            </p>
            <a href="https://www.instagram.com/nuansa.psychology?igsh=MTZkaG1tdHJ6ZWZwMw==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-[#E1306C] hover:text-[#C13584] transition text-xs font-bold">
              <Instagram className="h-4 w-4" />
              <span>Follow Instagram Kami</span>
            </a>
            <p className="text-[10px] text-stone-400 font-mono">
              IKHTISAR LEGAL: PT. Nuansa Daya Persada dirintis sejak tahun 2006 oleh Bunda Santi Meliyanti.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi Cepat</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-amber-300 transition">Tentang Kami</a></li>
              <li><a href="#layanan" className="hover:text-amber-300 transition">Layanan Kami</a></li>
              <li><a href="#biaya" className="hover:text-amber-300 transition">Kalkulator Biaya</a></li>
              <li><a href="#team" className="hover:text-amber-300 transition">Kenali Tim Kami</a></li>
              <li><a href="#faq" className="hover:text-amber-300 transition">Tanya Jawab</a></li>
              <li><Link href="/artikel" className="hover:text-amber-300 transition">Artikel</Link></li>
              <li><a href="#kontak" className="hover:text-amber-300 transition">Hubungi Kami</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Lokasi Kami</h4>
            <div className="space-y-4 text-xs text-stone-300">
              <div>
                <strong className="block text-white mb-1">Cimone</strong>
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>Jl. Proklamasi No 34, Cimone, Karawaci, Tangerang, 15114 (Keluar Terminal Cimone Sebelah Kiri Jalan)</span>
                </p>
              </div>
              <div>
                <strong className="block text-white mb-1">Konseling</strong>
                <p className="flex items-start">
                  <MapPin className="h-4 w-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>Bugel Mas Indah Jl. Besi IV Blok A17 No. 22, RT.001/RW.005, Bugel, Kec. Karawaci, Kota Tangerang, Banten 15113</span>
                </p>
              </div>
              <p className="flex items-center">
                <Mail className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                <span>layanan@nuansaconsulting.com</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                <span>+62 812 8453 550</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Misi Hubungan Sosial</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Kami menyisihkan sebagian alokasi pendapatan tahunan guna mensubsidi silang klien tidak mampu yang memiliki kendala dana agar tetap mendapat bimbingan SIPP terbaik.
            </p>
            <div className="inline-flex items-center space-x-1 border border-stone-800 bg-stone-950 px-2.5 py-1 rounded text-[9px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
              <span>HIMPSI Standard</span>
            </div>
          </div>

        </div>

        <div className="mx-auto max-w-7xl px-6 border-t border-stone-850 pt-8 mt-10 text-center text-xs text-stone-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Nuansa Psychology Consulting. Seluruh Hak Cipta Dilindungi Undang-Undang.</span>
        </div>
      </footer>

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end pointer-events-none">
        <motion.a
          href={waUrl}
          onClick={handleWaClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex items-center space-x-2.5 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full shadow-2xl pointer-events-auto cursor-pointer transition-all duration-300 border border-emerald-500/10 group shadow-emerald-950/25"
        >
          <div className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
          </div>
          <MessageCircle className="h-4.5 w-4.5 text-white transition group-hover:rotate-12 duration-200" />
        </motion.a>
      </div>

      {/* WhatsApp Redirect Transition Modal */}
      <AnimatePresence>
        {showRedirect && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRedirect(false)}
              className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm dark:bg-stone-950/60"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-sm bg-white dark:bg-[#1a1a19] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl text-center space-y-5"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowRedirect(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon container */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <MessageCircle className="h-7 w-7 animate-pulse" />
              </div>

              {/* Text content */}
              <div className="space-y-2">
                <h3 className="text-lg font-black text-stone-900 dark:text-white tracking-tight font-sans">
                  Menghubungkan ke WhatsApp...
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-sans px-2">
                  Tunggu sebentar, kami sedang menyiapkan sesi obrolan Anda dengan Admin Nuansa Psychology Consulting.
                </p>
              </div>

              {/* Progress/Transition Bar */}
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.0, ease: "linear" }}
                    className="h-full bg-emerald-600 rounded-full"
                  />
                </div>
                <div className="flex items-center justify-center space-x-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-wider uppercase">
                  <span>Mentransfer sesi Anda</span>
                  <span className="inline-block w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="inline-block w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="inline-block w-1 h-1 bg-emerald-600 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>

              {/* Fallback & Cancel buttons */}
              <div className="flex flex-col space-y-2.5 pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md hover:shadow-lg transition cursor-pointer space-x-2"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Buka Secara Manual</span>
                </a>
                <button
                  onClick={() => setShowRedirect(false)}
                  className="text-xs font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition cursor-pointer"
                >
                  Batalkan Pengalihan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
