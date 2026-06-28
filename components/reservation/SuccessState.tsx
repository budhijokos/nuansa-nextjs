"use client";

import React from "react";
import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { AnimatedCheckmark } from "@/components/ui/StatusIcons";
import { SecondaryButton } from "@/components/ui/Button";
import { BookingSummary } from "./BookingSummary";
import { ReservationData } from "@/lib/schemas";

interface SuccessStateProps {
  formData: ReservationData;
  isRedirecting: boolean;
  waUrlToOpen: string;
  onReset: () => void;
}

export function SuccessState({ formData, isRedirecting, waUrlToOpen, onReset }: SuccessStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 space-y-6"
    >
      <AnimatedCheckmark />
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-stone-900 dark:text-white tracking-tight">
          Konfirmasi Terkirim!
        </h3>
        <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 max-w-md mx-auto leading-relaxed">
          Terima kasih <strong>{formData.name}</strong>. Formulir pendaftaran sesi <strong>{formData.serviceType}</strong> Anda telah tercatat aman. Jika browser Anda memblokir pengalihan otomatis ke WhatsApp, silakan klik tombol di bawah ini.
        </p>
      </div>

      {isRedirecting && (
        <div className="flex flex-col items-center justify-center space-y-3 pt-2">
          <div className="h-1.5 w-full max-w-[220px] bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden mx-auto">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "linear" }}
              className="h-full bg-emerald-800 dark:bg-emerald-600 rounded-full"
            />
          </div>
          <div className="flex items-center justify-center space-x-1.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 tracking-wider uppercase animate-pulse">
            <span>Mengalihkan ke WhatsApp</span>
            <span className="inline-block w-1 h-1 bg-emerald-800 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="inline-block w-1 h-1 bg-emerald-800 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="inline-block w-1 h-1 bg-emerald-800 dark:bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}

      {waUrlToOpen && (
        <div className="pt-2">
          <a 
            href={waUrlToOpen} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition duration-200 cursor-pointer space-x-2"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Hubungi WhatsApp Sekarang</span>
          </a>
        </div>
      )}

      <BookingSummary formData={formData} />

      <div className="pt-2">
        <SecondaryButton onClick={onReset}>
          Isi Formulir Baru
        </SecondaryButton>
      </div>
    </motion.div>
  );
}
