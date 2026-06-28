"use client";

import React from "react";
import { CheckCircle2, Heart } from "lucide-react";

const TAKEAWAY_ITEMS: Record<string, { title: string; items: string[] }> = {
  "mengelola-burnout-tekanan-kerja": {
    title: "Key Takeaways: Mengelola Burnout",
    items: [
      "Burnout dipicu stres kronis batiniah yang berlangsung lama, bukan kemalasan temporer.",
      "Lakukan mikro jeda (Micro-Breaks) 20-30 detik setiap jam untuk mengatur ulang amigdala otak.",
      "Batasi batas kerja mental harian secara sakral demi menjaga ketahanan neuro-psikologis."
    ]
  },
  "komunikasi-asertif-keluarga": {
    title: "Key Takeaways: Berbincang Sehat Asertif",
    items: [
      "Asertivitas adalah mengekspresikan ganjalan hati tanpa menyerang harga diri orang terdekat.",
      "Hindari kalimat tuduhan negatif dan kuasai formula 'I-Statement' untuk melunakkan penolakan.",
      "Keintiman keluarga sejati bermula dari rasa saling percaya bahwa perasaan setiap anggota berharga."
    ]
  },
  "menghargai-emosi-negatif": {
    title: "Key Takeaways: Memeluk Emosi Negatif",
    items: [
      "Menolak rasa sedih/kecewa malah melipatgandakan energi negatif menjadi letupan kecemasan parah.",
      "Setiap emosi membawakan telegram pesan evolutif tersirat mengenai boundaries hidup Anda.",
      "Praktikkan metode RAIN klinis: akui keberadaannya, izinkan ia singgah, telusuri sebabnya, dan asuh lembut."
    ]
  },
  "membangunan-boundaries-sehat": {
    title: "Key Takeaways: Merajut Boundaries Sehat",
    items: [
      "Mengukir batasan pribadi (boundaries) adalah aksi cinta diri demi memelihara integritas batin.",
      "Menolak eksploitasi di luar kapasitas adalah hak asasi Anda untuk tetap beroperasi secara waras.",
      "Sikap asertif boundaries merupakan bentuk kepedulian sejati agar ketulusan relasi terjaga matang."
    ]
  },
  "psikologi-pola-asuh-positif": {
    title: "Key Takeaways: Pengasuhan Penuh Empati",
    items: [
      "Tantrum balita adalah amukan biologis akibat ketidakmatangan syaraf otak atas, bukan kebebalan moral.",
      "Lakukan koneksi emosi (Co-Regulation) sebelum terburu-buru mengoreksi perilaku anak.",
      "Keseimbangan emosi orang tua adalah oase penyembuhan bagi kedamaian sirkuit otak sang anak."
    ]
  },
  "memutus-rantai-overthinking": {
    title: "Key Takeaways: Memangkas Overthinking",
    items: [
      "Overthinking adalah hiperaktivitas jaringan DMN otak yang memicu alarm kecemasan semu.",
      "Batasi pikiran rumit dengan memindahkan seluruh gumpalan asumsi ke lembaran kertas via 'Worry Time'.",
      "Kuasai teknik Sensory Grounding 5-4-3-2-1 untuk mengembalikan damai bertenaga saat badai pikiran mendera."
    ]
  },
  "meditasi-lima-menit": {
    title: "Key Takeaways: Meditasi 5 Menit",
    items: [
      "Meditasi mikro melatih kelenturan syaraf prefrontal korteks untuk meredam pelepasan kortisol.",
      "Gunakan udara napas sebagai pelabuhan tenang tempat berlabuhnya pikiran liar Anda.",
      "Latihan singkat 5 menit yang berkesinambungan membentuk sel otak baru yang jauh lebih kuat menahan stres."
    ]
  },
  "menjaga-keintiman-pernikahan": {
    title: "Key Takeaways: Kehangatan Keintiman",
    items: [
      "Pilar kehangatan jangka panjang bertumpu pada relaksasi emosional dan sentuhan fisik harian.",
      "Tabung selalu saldo Rekening Bank Emosional pasangan lewat asupan apresiasi verbal spesifik.",
      "Sediakan ritual 15 menit tanpa layar gawai di ranjang kasur untuk membahas dunia batin kalian."
    ]
  },
  "seni-bangkit-dari-kegagalan": {
    title: "Key Takeaways: Bangkit Bertumbuh",
    items: [
      "Kegagalan semu bukanlah cerminan jati diri sejati; ia hanyalah data pengingat taktik berikutnya.",
      "Hargai peluh perjuangan (Growth Mindset) ketimbang menuntut target instan tanpa kegagalan.",
      "Rangkul keterbatasan fana diri lewat kehangatan rasa self-compassion saat jatuh tersungkur."
    ]
  },
  "tidur-dan-stabilitas-emosi": {
    title: "Key Takeaways: Tidur & Ketenangan Jiwa",
    items: [
      "Kurang tidur merusak efisiensi prefrontal korteks, membuat Anda 60% lebih reaktif-emosional.",
      "Latih ritme ritmik sirkadian tubuh dengan jam tidur dan jam bangun pagi yang stabil.",
      "Singkirkan radiasi cahaya biru smartphone minimal 60 menit sebelum melepas kantuk batin."
    ]
  }
};

export function KeyTakeawaysBox({ slug }: { slug: string }) {
  const takeaway = TAKEAWAY_ITEMS[slug];
  if (!takeaway) return null;

  return (
    <div className="my-12 p-8 rounded-[2.5rem] bg-emerald-50/60 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 relative overflow-hidden takeaway-box">
      {/* Visual leaf layout accent */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-800/5 dark:bg-emerald-400/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-100/30 dark:bg-emerald-900/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-450">
          <CheckCircle2 className="h-5 w-5 text-emerald-700 dark:text-emerald-450 shrink-0" />
          <h3 className="text-sm font-extrabold uppercase tracking-widest leading-none font-mono">{takeaway.title}</h3>
        </div>

        <ul className="space-y-4">
          {takeaway.items.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-3 text-stone-700 dark:text-stone-300 text-sm md:text-base leading-relaxed">
              <span className="flex h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-400 text-[10px] font-extrabold items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="pt-2 flex items-center space-x-2 text-xs text-stone-400 dark:text-stone-500 border-t border-emerald-100/50 dark:border-emerald-900/20">
          <Heart className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500 animate-pulse shrink-0" />
          <span>Nuansa Psychology — Mendampingi Tumbuh Bersama.</span>
        </div>
      </div>
    </div>
  );
}
