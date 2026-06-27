"use client";

import React from "react";
import { ReservationData } from "@/lib/schemas";

interface BookingSummaryProps {
  formData: ReservationData;
}

export function BookingSummary({ formData }: BookingSummaryProps) {
  return (
    <div className="bg-stone-50 dark:bg-stone-900 p-4 rounded-xl text-left border border-stone-150 dark:border-stone-850 inline-block text-xs text-stone-700 dark:text-stone-300 space-y-1.5 max-w-sm w-full">
      <span className="block font-bold text-stone-800 dark:text-stone-200 border-b border-stone-200 dark:border-stone-800 pb-1">
        Detail Tiket Janji Temu:
      </span>
      <div>
        Klien: <strong className="text-stone-800 dark:text-stone-200">{formData.name}</strong>
      </div>
      <div>
        Layanan: <strong className="text-stone-800 dark:text-stone-200">{formData.serviceType}</strong>
      </div>
      <div>
        Hp Terdaftar: <strong className="text-stone-800 dark:text-stone-200">{formData.phone}</strong>
      </div>
    </div>
  );
}
