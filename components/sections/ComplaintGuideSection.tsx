"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Loader2, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/Animations";
import { renderComplaintIcon } from "@/components/ui/StatusIcons";
import { COMPLAINT_GUIDELINES } from "@/lib/complaint-data";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ComplaintGuideSection() {
  const router = useRouter();
  const [selectedComplaintId, setSelectedComplaintId] = useState("anxiety");
  const [loadingGuidelines, setLoadingGuidelines] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingGuidelines(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SectionWrapper 
      id="ai-consultant" 
      className="bg-stone-100 dark:bg-stone-950 border-y border-stone-200/40 dark:border-stone-800/50"
      badge="Psikoedukasi"
      title="Panduan Penanganan Keluhan Secara Mandiri"
      description="Edukasi mandiri dan pertolongan pertama (First-Aid) sesuai dengan regulasi psikologi klinis. Temukan pemetaan gejala awalmu dan jadwalkanlah sesi pemulihan batin intens bersama Tim Psikolog Nuansa."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Complaint Categories Selection list */}
        <div className="lg:col-span-4 lg:col-span-5 space-y-3">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-2">Pilih Kategori Keluhan:</span>
          <div className="flex flex-col space-y-3">
            {loadingGuidelines ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl p-4 flex items-center space-x-3.5 animate-pulse"
                  id={`complaint-skeleton-bttn-${idx}`}
                >
                  <div className="p-2.5 bg-stone-100 dark:bg-stone-800 rounded-lg shrink-0 w-10 h-10" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-2 bg-stone-150 dark:bg-stone-700 rounded w-1/4" />
                    <div className="h-3 bg-stone-150 dark:bg-stone-700 rounded w-3/4" />
                  </div>
                </div>
              ))
            ) : (
              COMPLAINT_GUIDELINES.map((item) => {
                const isActive = selectedComplaintId === item.id;
                return (
                  <button
                    key={item.id}
                    id={`complaint-tab-bttn-${item.id}`}
                    onClick={() => setSelectedComplaintId(item.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-emerald-800 border-emerald-800 text-white shadow-md shadow-emerald-950/15 animate-none"
                        : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-emerald-700/30 dark:hover:border-emerald-700/50 text-stone-700 dark:text-stone-300 hover:bg-stone-50/50 dark:hover:bg-stone-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className={`p-2 rounded-lg shrink-0 ${isActive ? "bg-white/10 text-white" : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400"}`}>
                        {renderComplaintIcon(item.icon, "h-5 w-5")}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className={`block text-[10px] font-semibold tracking-wide ${isActive ? "text-stone-100" : "text-stone-600 dark:text-stone-300"}`}>
                          {item.badge}
                        </span>
                        <h3 className={`text-xs sm:text-xs md:text-sm font-bold truncate mt-0.5 ${isActive ? "text-white" : "text-stone-850 dark:text-stone-100"}`}>
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Standard Details Card */}
        <div className="lg:col-span-7">
          {loadingGuidelines ? (
            <div id="complaint-skeleton-detail" className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/60 dark:border-stone-800 shadow-md p-6 lg:p-8 space-y-6 animate-pulse">
              {/* Header spinner / loader block */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
                <div className="flex items-center space-x-3">
                  <div className="p-3.5 bg-stone-100 dark:bg-stone-800 rounded-xl w-12 h-12" />
                  <div className="space-y-2 flex-1">
                    <div className="h-2.5 bg-stone-150 dark:bg-stone-700 rounded w-24" />
                    <div className="h-3.5 bg-stone-150 dark:bg-stone-700 rounded w-56" />
                  </div>
                </div>
                {/* Quiet dynamic spinner in the skeleton card header */}
                <div className="flex items-center space-x-2 bg-emerald-800/10 dark:bg-emerald-900/20 border border-emerald-100/30 dark:border-emerald-800/50 px-3 py-1.5 rounded-full self-start sm:self-center">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-700 dark:text-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-800 dark:text-emerald-400 font-mono tracking-wide animate-pulse">Menyelaraskan SIPP</span>
                </div>
              </div>

              {/* Description Paragraph skeleton */}
              <div className="space-y-2.5">
                <div className="h-2 bg-stone-150 dark:bg-stone-700 rounded w-32" />
                <div className="h-3 bg-stone-150 dark:bg-stone-700 rounded w-full" />
                <div className="h-3 bg-stone-150 dark:bg-stone-700 rounded w-4/5" />
              </div>

              {/* Symptoms block skeleton */}
              <div className="space-y-3 bg-stone-50/70 dark:bg-stone-800/50 p-4 border border-stone-100 dark:border-stone-800 rounded-xl">
                <div className="h-2 bg-stone-150 dark:bg-stone-700 rounded w-40" />
                <div className="space-y-2">
                  {[1, 2, 3].map((sIndex) => (
                    <div key={sIndex} className="flex items-center space-x-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-stone-200 dark:bg-stone-600 shrink-0" />
                      <div className="h-3 bg-stone-150 dark:bg-stone-700 rounded w-5/6" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Steps list skeleton */}
              <div className="space-y-4">
                <div className="h-2 bg-stone-150 dark:bg-stone-700 rounded w-36" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map((stepIdx) => (
                    <div key={stepIdx} className="p-4 border border-stone-100 dark:border-stone-800 rounded-xl space-y-2 bg-stone-50/30 dark:bg-stone-800/30">
                      <div className="h-3 bg-stone-150 dark:bg-stone-700 rounded w-3/4" />
                      <div className="h-2.5 bg-stone-150 dark:bg-stone-700 rounded w-full" />
                      <div className="h-2.5 bg-stone-150 dark:bg-stone-700 rounded w-5/6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {(() => {
                const current = COMPLAINT_GUIDELINES.find(x => x.id === selectedComplaintId) || COMPLAINT_GUIDELINES[0];
                return (
                  <motion.div
                    key={current.id}
                    id={`complaint-info-card-${current.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-md p-6 lg:p-8 space-y-6"
                  >
                    {/* Header block */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-5">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-800/10 text-emerald-800 dark:text-emerald-400 rounded-xl">
                          {renderComplaintIcon(current.icon, "h-6 w-6")}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 font-mono uppercase bg-emerald-50 dark:bg-emerald-800/10 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800">
                            {current.badge}
                          </span>
                          <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 mt-1.5">{current.title}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Overview Description */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] md:text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-widest block">Deskripsi Aspek Klinis</span>
                      <p className="text-stone-850 dark:text-stone-300 text-xs md:text-base leading-relaxed">{current.description}</p>
                    </div>
 
                    {/* Symptoms checklist */}
                    <div className="space-y-3 bg-stone-50/50 dark:bg-stone-800/50 p-4 border border-stone-150 dark:border-stone-800 rounded-xl">
                      <span className="text-[10px] md:text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-widest block">Gejala / Tanda Klinis Umum</span>
                      <div className="space-y-2">
                        {current.symptoms.map((symptom, sIdx) => (
                          <div key={sIdx} className="flex items-start space-x-2.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-600 dark:bg-emerald-500 mt-1.5 shrink-0" />
                            <p className="text-xs md:text-base text-stone-850 dark:text-stone-300 leading-relaxed">{symptom}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Self-Help Guides list */}
                    <div className="space-y-4">
                      <span className="text-[10px] md:text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-widest block">Langkah Penanganan Mandiri Sesuai Teori</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {current.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="bg-emerald-50/35 dark:bg-emerald-900/10 border border-emerald-100/70 dark:border-emerald-800/50 rounded-xl p-4 space-y-1.5">
                            <span className="text-[9px] font-extrabold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide bg-emerald-50 dark:bg-emerald-800/20 px-2 py-0.5 rounded">
                              Langkah {stepIndex + 1}
                            </span>
                            <h4 className="text-xs md:text-base font-extrabold text-stone-900 dark:text-stone-100">{step.title}</h4>
                            <p className="text-[11px] md:text-sm text-stone-800 dark:text-stone-300 leading-relaxed font-sans">{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
 
                    {/* Referral and booking trigger section */}
                    <div className="border-t border-stone-200/80 dark:border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                      <div className="text-left w-full sm:w-auto">
                        <span className="text-[10px] md:text-xs font-bold text-stone-500 dark:text-stone-450 uppercase tracking-widest block">Layanan Pendamping Terpilih:</span>
                        <span className="text-xs md:text-sm font-bold text-emerald-800 dark:text-emerald-400 block mt-0.5">{current.serviceLabel}</span>
                        <p className="text-[10px] md:text-xs text-stone-600 dark:text-stone-300 mt-1 font-medium">*Sesi SIPP Aktif di bawah asuhan Nuansa Psychology Consulting.</p>
                      </div>
                      <button
                        id={`complaint-cta-${current.id}`}
                        onClick={() => {
                          const serviceEncoded = encodeURIComponent(current.service);
                          const templateEncoded = encodeURIComponent(current.bookingTemplate);
                          router.push(`/reservasi?service=${serviceEncoded}&message=${templateEncoded}`);
                        }}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-800 hover:bg-stone-900 hover:text-white text-white text-xs font-bold transition duration-150 flex items-center justify-center space-x-2 shadow-md cursor-pointer active:scale-95 shrink-0"
                      >
                        <span>Hubungi Psikolog Nuansa</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>

                  </motion.div>
                );
              })()}
            </AnimatePresence>
          )}
        </div>

      </div>
    </SectionWrapper>
  );
}
