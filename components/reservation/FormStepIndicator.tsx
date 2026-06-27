"use client";

import React from "react";
import { ClipboardCheck, CheckCircle, MessageCircle, LucideIcon } from "lucide-react";

interface StepProps {
  icon: LucideIcon;
  label: string;
}

const Step = ({ icon: Icon, label }: StepProps) => (
  <div className="flex flex-col items-center justify-center text-center space-y-1 p-2 rounded-lg bg-white dark:bg-stone-800/30 shadow-sm border border-stone-100 dark:border-stone-800">
    <Icon className="h-4 w-4 text-emerald-850 dark:text-emerald-450" />
    <span className="text-[9px] font-bold text-stone-700 dark:text-stone-300 leading-tight">{label}</span>
  </div>
);

export function FormStepIndicator() {
  return (
    <div className="bg-stone-50 dark:bg-stone-900/40 p-4 rounded-xl border border-stone-150 dark:border-stone-850/50">
      <span className="block text-[10px] font-bold text-stone-650 dark:text-stone-300 uppercase tracking-widest text-center mb-3">
        Tiga Langkah Mudah Pendaftaran
      </span>
      <div className="grid grid-cols-3 gap-2">
        <Step icon={ClipboardCheck} label="1. Isi Formulir" />
        <Step icon={CheckCircle} label="2. Verifikasi Data" />
        <Step icon={MessageCircle} label="3. Hubungkan WA" />
      </div>
    </div>
  );
}
