"use client";
import React, { useState } from "react";
import { Smile, Building, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollReveal } from "@/components/ui/Animations";
import { QuoteBackground } from "@/components/ui/Misc";
import { RatingStars } from "@/components/ui/StatusIcons";
import { INSTITUTIONAL_TESTIMONIALS, PERSONAL_TESTIMONIALS } from "@/lib/testimonials-data";
import { TestimonialModal } from "@/components/modals/TestimonialModal";

// Import WebP assets
import imgAgusSapto from "@/src/assets/images/testimonials/agus-sapto.webp";
import imgHenny from "@/src/assets/images/testimonials/henny.webp";
import imgLeni from "@/src/assets/images/testimonials/leni.webp";
import imgMarjayadi from "@/src/assets/images/testimonials/marjayadi-testimoni.webp";
import imgMaryono from "@/src/assets/images/testimonials/maryono.webp";
import imgNurhayati from "@/src/assets/images/testimonials/nurhayati.webp";
import imgNurmalasari from "@/src/assets/images/testimonials/nurmalasari.webp";
import imgRisanah from "@/src/assets/images/testimonials/risanah.webp";
import imgSri from "@/src/assets/images/testimonials/sri.webp";
import imgSurono from "@/src/assets/images/testimonials/surono.webp";
import imgTurinah from "@/src/assets/images/testimonials/turinah.webp";

// Map names to their corresponding imported image objects
const testimonialImageMap: Record<string, any> = {
  "Maryono": imgMaryono,
  "Nurhayati, M.Pd": imgNurhayati,
  "Sri Darmayanti, S.Pd,.Bio": imgSri,
  "Lenny Marlina": imgLeni,
  "Surono, S.M.": imgSurono,
  "Rissyanah Kartaatmadja": imgRisanah,
  "Marjayadi": imgMarjayadi,
  "Henny Aryantini": imgHenny,
  "Nurmalasari": imgNurmalasari,
  "Turinah Ayuriani": imgTurinah,
  "Agus Sapto": imgAgusSapto,
};

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { TestimonialCard } from "@/components/testimonial/TestimonialCard";

export function TestimonialsSection() {
  const [testimonialTab, setTestimonialTab] = useState<"lembaga" | "perorangan">("lembaga");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);

  const toggleExpand = (name: string) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <SectionWrapper 
      id="trust" 
      className="bg-stone-50 dark:bg-[#121211]"
      badge="Kerja Sama & Kepercayaan"
      title="Testimoni Klien Kami"
      description="Kami bangga mendampingi pertumbuhan jiwa ribuan individu serta dipercaya puluhan instansi di bawah naungan Nuansa Psychology Consulting."
    >
      {/* Tab Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-stone-200/60 dark:border-stone-800 pb-6">
        <div className="flex gap-2">
          {[
            { id: "lembaga", label: "Lembaga & Institusi", icon: Building },
            { id: "perorangan", label: "Klien Perorangan", icon: User },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTestimonialTab(tab.id as any)}
              className={`flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-semibold cursor-pointer transition duration-150 ${
                testimonialTab === tab.id
                  ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/10"
                  : "bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-750 dark:text-stone-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowTestimonialModal(true)}
          className="flex items-center space-x-2 px-5 py-3 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-800/15 dark:hover:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-800/20 dark:border-emerald-800/40 transition duration-150 cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <Smile className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
          <span>Tulis Testimoni Sesi Kamu</span>
        </button>
      </div>

      {/* Testimonial Cards Render Wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonialTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(testimonialTab === "lembaga" ? INSTITUTIONAL_TESTIMONIALS : PERSONAL_TESTIMONIALS).map((item, idx) => (
            <TestimonialCard 
              key={idx}
              index={idx}
              name={item.name}
              role={item.role}
              text={item.text}
              rating={item.rating}
              initials={item.initials}
              isWide={item.isWide}
              image={testimonialImageMap[item.name]}
              isExpanded={!!expanded[item.name]}
              onToggleExpand={() => toggleExpand(item.name)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Dynamic Testimonial Input Form Modal */}
      <TestimonialModal isOpen={showTestimonialModal} onClose={() => setShowTestimonialModal(false)} />
    </SectionWrapper>
  );
}
