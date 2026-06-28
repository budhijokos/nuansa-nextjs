import React from "react";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldAlert
} from "lucide-react";

import { SITE_METADATA } from "@/lib/constants";

import { SectionHeader } from "@/components/ui/SectionWrapper";

export function ContactInfo() {
  return (
    <div className="lg:col-span-5 space-y-6">
      <SectionHeader 
        align="left"
        badge="Akses Kontak Terbuka"
        title="Hubungi Kami & Buat Janji Temu"
        description={`Silakan isi data dirimu secara lengkap melalui formulir reservasi resmi kami. Tim pengelola ${SITE_METADATA.name} akan segera menghubungi kamu dalam kurun waktu 1x24 jam guna mencocokkan jadwal psikolog SIPP terpilih.`}
        className="!mb-0"
      />

      <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-stone-850">
        <div className="flex items-start space-x-3 text-stone-700 dark:text-stone-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 shrink-0">
            <MapPin className="h-5 w-5" />
          </div>
          <div className="space-y-4">
            <div>
              <span className="block text-[10px] text-stone-600 dark:text-stone-400 uppercase font-mono tracking-wider font-bold">Alamat Terdaftar</span>
              <span className="text-xs font-semibold block text-stone-800 dark:text-stone-200">{SITE_METADATA.address}</span>
            </div>
            <div>
              <span className="block text-[10px] text-stone-600 dark:text-stone-400 uppercase font-mono tracking-wider font-bold">Lokasi Konseling (Bugel)</span>
              <span className="text-xs font-semibold block text-stone-800 dark:text-stone-200">Bugel Mas Indah Jl. Besi IV Blok A17 No. 22, RT.001/RW.005, Bugel, Kec. Karawaci, Kota Tangerang, Banten 15113</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[10px] text-stone-600 dark:text-stone-400 uppercase font-mono tracking-wider font-bold">Jam Kerja Klinik</span>
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">{SITE_METADATA.openingHours}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400">
            <Phone className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[10px] text-stone-600 dark:text-stone-400 uppercase font-mono tracking-wider font-bold">Telepon / WhatsApp Official</span>
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">{SITE_METADATA.phone}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-stone-700 dark:text-stone-300">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-[10px] text-stone-600 dark:text-stone-400 uppercase font-mono tracking-wider font-bold">Inquiry Email</span>
            <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">{SITE_METADATA.email}</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30 flex items-start space-x-2.5">
        <ShieldAlert className="h-4 w-4 text-emerald-800 dark:text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-emerald-950 dark:text-emerald-300 leading-relaxed font-medium">
          <strong>Pemberitahuan Krisis Jiwa Darurat:</strong> Jika kamu atau kerabat terdekat sedang mengalami krisis jiwa berat yang mengancam nyawa, silakan hubungi Hotline Darurat Kemenkes 119 ekstensi 8 atau kunjungi Unit IGD Rumah Sakit terdekat dengan segera.
        </p>
      </div>

      <div className="mt-8 space-y-3">
        <div className="flex items-center space-x-2">
          <div className="h-px bg-stone-200 dark:bg-stone-850 flex-grow" />
          <span className="text-[10px] font-bold text-stone-650 dark:text-stone-350 uppercase tracking-widest whitespace-nowrap">Peta Lokasi</span>
          <div className="h-px bg-stone-200 dark:bg-stone-850 flex-grow" />
        </div>
        <div className="rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 h-56 group shadow-sm bg-stone-100 dark:bg-stone-900 relative">
          <iframe
            title={`${SITE_METADATA.name} Cimone Map`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src="https://www.google.com/maps?q=Nuansa+Psychology+Consulting,+Bugel,+Kec.+Karawaci,+Kota+Tangerang&t=&z=16&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full opacity-90 hover:opacity-100 transition-all duration-700"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
