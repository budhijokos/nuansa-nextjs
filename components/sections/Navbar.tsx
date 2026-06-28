"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import logoNuansa from "@/src/assets/images/logo-nuansa/logo-nuansa.webp";
import { useScroll } from "@/hooks/useScroll";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme, mounted } = useTheme();
  const { scrolled } = useScroll(20);

  const navLinks = [
    { name: "Tentang Kami", href: "/#about" },
    { name: "Layanan Psikologi", href: "/#layanan" },
    { name: "Kalkulator Harga", href: "/#biaya" },
    { name: "Tim Praktisi", href: "/#team" },
    { name: "Artikel", href: "/artikel" },
    { name: "FAQ & Prosedur", href: "/#faq" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-xl py-0 shadow-lg shadow-stone-900/5 dark:shadow-black/20 border-stone-200/60 dark:border-stone-800" 
        : "bg-transparent py-2 border-transparent"
    } border-b`}>
      <nav aria-label="Navigasi Utama" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-11 w-11 flex items-center justify-center rounded-full overflow-hidden shadow-md border border-emerald-900/10 bg-white">
              <ImageOptimizer
                src={logoNuansa}
                alt="Logo Nuansa"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="block font-sans text-base font-bold tracking-tight text-stone-900 dark:text-white leading-none uppercase">NUANSA</span>
              <span className="block font-mono text-[9px] font-bold tracking-[0.2em] text-stone-500 dark:text-stone-400 uppercase mt-1">Psychology Consulting</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-400 transition duration-150"
            >
              {link.name}
            </Link>
          ))}
          
          {/* Theme Toggle desktop */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition duration-150 text-stone-600 dark:text-stone-300"
            aria-label="Toggle Theme"
          >
            {(mounted && isDark) ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-stone-600" />}
          </button>

          <Link
            href="/reservasi"
            className="inline-flex items-center justify-center rounded-full bg-emerald-800 dark:bg-emerald-700 px-6 py-2.5 text-xs font-semibold tracking-wide text-stone-50 shadow-sm transition duration-150 hover:bg-emerald-950 dark:hover:bg-emerald-650"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Mobile Hamburguer & Theme Toggle Triggers */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition duration-150 text-stone-600 dark:text-stone-300 mr-1"
            aria-label="Toggle Theme Mobile"
          >
            {mounted && isDark ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5 text-stone-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 hover:bg-stone-100 dark:hover:bg-stone-900 lg:hidden transition mr-1"
            aria-label="Navigasi Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6 text-stone-700 dark:text-stone-300" /> : <Menu className="h-6 w-6 text-stone-700 dark:text-stone-300" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 px-6 py-6 lg:hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-stone-800 dark:text-stone-200 hover:text-emerald-800 dark:hover:text-emerald-400"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/reservasi"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-xl bg-emerald-800 dark:bg-emerald-700 py-3 text-sm font-semibold text-stone-50"
              >
                Mulai Buat Janji Temu
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
