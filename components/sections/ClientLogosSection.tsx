"use client";
import React from "react";
import { ImageOptimizer } from "@/components/ui/ImageOptimizer";
import { motion } from "motion/react";
import { ScrollReveal } from "@/components/ui/Animations";
import { StaggeredBadge } from "@/components/ui/Misc";

// Import all client logos
import logoDJPb from "@/src/assets/images/logo-klien/DJPb-Kalteng.png";
import logoAkbid from "@/src/assets/images/logo-klien/akbid-karyabunda.png";
import logoAssyukriyyah from "@/src/assets/images/logo-klien/assyukriyyah.png";
import logoAtTaqwa from "@/src/assets/images/logo-klien/at-taqwa.png";
import logoBunayya from "@/src/assets/images/logo-klien/bunayya.jpeg";
import logoIndahKiat from "@/src/assets/images/logo-klien/indahkiat.jpeg";
import logoLpkCis from "@/src/assets/images/logo-klien/lpk-cis.png";
import logoPermataBunda from "@/src/assets/images/logo-klien/permata-bunda.png";
import logoSditGranada from "@/src/assets/images/logo-klien/sdit-granada.png";
import logoSditTangerang from "@/src/assets/images/logo-klien/sdit-tangerang.png";
import logoSmkn3 from "@/src/assets/images/logo-klien/smkn3-tangerang.jpg";
import logoSmkn4 from "@/src/assets/images/logo-klien/smkn4-tangerang.jpeg";
import logoSmkn7 from "@/src/assets/images/logo-klien/smkn7-tangerang.jpeg";
import logoSmpn15 from "@/src/assets/images/logo-klien/smpn15-tangerang.png";
import logoSmpn9 from "@/src/assets/images/logo-klien/smpn9-tangerang.jpg";
import logoSyafana from "@/src/assets/images/logo-klien/syafana.png";
import logoThi from "@/src/assets/images/logo-klien/thi.png";
import logoYayasanThi from "@/src/assets/images/logo-klien/yayasan-thi.png";

interface ClientLogo {
  src: any;
  name: string;
}

// Split the 18 client logos into two distinct rows for visual balance and richness
const ROW1_LOGOS: ClientLogo[] = [
  { src: logoDJPb, name: "Kanwil DJPb Kalimantan Tengah" },
  { src: logoAkbid, name: "Akbid Karya Bunda" },
  { src: logoAssyukriyyah, name: "SMPIT Asy-Syukriyyah" },
  { src: logoAtTaqwa, name: "Sekolah At-Taqwa" },
  { src: logoBunayya, name: "TKIT Bunayya" },
  { src: logoIndahKiat, name: "PT Indah Kiat Pulp & Paper" },
  { src: logoLpkCis, name: "LPK CIS" },
  { src: logoPermataBunda, name: "Yayasan Permata Bunda" },
  { src: logoSditGranada, name: "SDIT Granada" },
];

const ROW2_LOGOS: ClientLogo[] = [
  { src: logoSditTangerang, name: "SDIT Tangerang" },
  { src: logoSmkn3, name: "SMKN 3 Tangerang" },
  { src: logoSmkn4, name: "SMKN 4 Tangerang" },
  { src: logoSmkn7, name: "SMKN 7 Tangerang" },
  { src: logoSmpn15, name: "SMPN 15 Tangerang" },
  { src: logoSmpn9, name: "SMPN 9 Tangerang" },
  { src: logoSyafana, name: "Syafana Islamic School" },
  { src: logoThi, name: "YPI Tunas Harapan Ilahi (THI)" },
  { src: logoYayasanThi, name: "Yayasan Tunas Harapan Ilahi" },
];

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ClientLogosSection() {
  return (
    <SectionWrapper 
      className="bg-stone-50 dark:bg-[#121211] border-b border-stone-200/40 dark:border-stone-850"
      badge="Mitra & Klien Kami"
      title="Telah Dipercaya oleh Berbagai Lembaga & Sekolah"
      description="Nuansa Psychology Consulting bangga telah menjadi mitra tepercaya dalam menyelenggarakan psikotes, seminar parenting, bimbingan konseling, pelatihan, dan seleksi SDM bagi jajaran instansi pemerintahan, yayasan pendidikan, sekolah dasar hingga menengah, serta dunia industri."
    >
      {/* Decorative background grid pattern moved inside if needed, or kept in SectionWrapper via children */}
      <div className="absolute inset-0 bg-[radial-gradient(#065f46_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.015] pointer-events-none"></div>

      {/* Carousel Container with Fading Edge Masks */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left fading gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-stone-50 via-stone-50/70 to-transparent dark:from-[#121211] dark:via-[#121211]/70 dark:to-transparent z-10 pointer-events-none" />
        
        {/* Right fading gradient overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-stone-50 via-stone-50/70 to-transparent dark:from-[#121211] dark:via-[#121211]/70 dark:to-transparent z-10 pointer-events-none" />

        {/* Row 1: Scrolling Left */}
        <div className="flex overflow-hidden w-full mb-6">
          <motion.div
            className="flex space-x-6 md:space-x-8 whitespace-nowrap shrink-0 pr-6 md:pr-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 26,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }}
            style={{ width: "max-content" }}
          >
            {/* Combine original and duplicate for infinite effect */}
            {[...ROW1_LOGOS, ...ROW1_LOGOS].map((logo, idx) => (
              <div
                key={`row1-${idx}`}
                className="inline-flex flex-col items-center justify-center bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-2xl p-4 w-40 h-24 md:w-48 md:h-28 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-md hover:scale-[1.03] group shrink-0"
                title={logo.name}
              >
                <div className="relative w-full h-12 md:h-16 flex items-center justify-center">
                  <ImageOptimizer
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 768px) 120px, 160px"
                    className="object-contain filter grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 dark:opacity-50 dark:group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <span className="mt-2 text-[9px] md:text-[10px] text-stone-600 dark:text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 font-medium tracking-wide text-center max-w-full truncate px-1 transition-colors duration-300">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            className="flex space-x-6 md:space-x-8 whitespace-nowrap shrink-0 pr-6 md:pr-8"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 28,
              repeat: Infinity,
            }}
            whileHover={{ animationPlayState: "paused" }}
            style={{ width: "max-content" }}
          >
            {/* Combine original and duplicate for infinite effect */}
            {[...ROW2_LOGOS, ...ROW2_LOGOS].map((logo, idx) => (
              <div
                key={`row2-${idx}`}
                className="inline-flex flex-col items-center justify-center bg-white dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] rounded-2xl p-4 w-40 h-24 md:w-48 md:h-28 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-md hover:scale-[1.03] group shrink-0"
                title={logo.name}
              >
                <div className="relative w-full h-12 md:h-16 flex items-center justify-center">
                  <ImageOptimizer
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 768px) 120px, 160px"
                    className="object-contain filter grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 dark:opacity-50 dark:group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
                <span className="mt-2 text-[9px] md:text-[10px] text-stone-600 dark:text-stone-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 font-medium tracking-wide text-center max-w-full truncate px-1 transition-colors duration-300">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
