"use client";
import React, { useState, useEffect } from "react";
import { User, Activity, Building2, Building, MapPin, Heart, Sparkles, Briefcase, Award, Smile } from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ScrollReveal } from "@/components/ui/Animations";
import { StaggeredBadge, GlassIcon } from "@/components/ui/Misc";

import { STATS_CONFIG } from "@/lib/achievements-data";

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function AchievementsSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [counterStats, setCounterStats] = useState<{ [key: string]: number }>(
    Object.fromEntries(STATS_CONFIG.map(s => [s.key, 0]))
  );

  const [simulatedStats, setSimulatedStats] = useState<{ [key: string]: number }>(
    Object.fromEntries(STATS_CONFIG.map(s => [s.key, 0]))
  );

  const [showPop, setShowPop] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(STATS_CONFIG.map(s => [s.key, false]))
  );

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animateCounts = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = percentage * (2 - percentage);

      setCounterStats(prev => {
        const nextStats = { ...prev };
        STATS_CONFIG.forEach(stat => {
          nextStats[stat.key] = Math.floor(ease * stat.target);
        });
        return nextStats;
      });

      if (percentage < 1) {
        requestAnimationFrame(animateCounts);
      }
    };

    requestAnimationFrame(animateCounts);
  }, [isInView]);

  const triggerPop = (key: string) => {
    setShowPop(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setShowPop(prev => ({ ...prev, [key]: false }));
    }, 800);
  };

  const totalSimulated = Object.values(simulatedStats).reduce((a, b) => a + b, 0);

  return (
    <div ref={sectionRef}>
      <SectionWrapper 
        id="pencapaian" 
        className="bg-stone-50 dark:bg-[#121211] border-b border-stone-200/40 dark:border-stone-850"
        badge="Nuansa Dalam Angka"
        title="Kepercayaan Klien kepada Kami"
        description="Di bawah bendera Nuansa Psychology Consulting, kami telah berkontribusi memperkuat kesehatan mental masyarakat Indonesia secara konsisten."
      >
        <div className="absolute inset-0 bg-[radial-gradient(#065f46_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02] pointer-events-none"></div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1, 
              transition: { staggerChildren: 0.2 } 
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STATS_CONFIG.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.key}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -6, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}
                className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm transition duration-200 relative flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl flex items-center justify-center text-emerald-800 dark:text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <AnimatePresence>
                      {showPop[stat.key] && (
                        <motion.span
                          initial={{ opacity: 1, y: 10, scale: 0.8 }}
                          animate={{ opacity: 0, y: -40, scale: 1.5 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6 }}
                          className="absolute right-6 top-6 text-emerald-800 dark:text-emerald-400 font-mono font-extrabold text-sm"
                        >
                          {stat.simLabel}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <div className="flex items-baseline space-x-1">
                      <motion.span 
                        key={counterStats[stat.key] + simulatedStats[stat.key]}
                        initial={{ scale: 0.9, opacity: 0.9 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-50 font-sans"
                      >
                        {(counterStats[stat.key] + simulatedStats[stat.key]).toLocaleString("id-ID")}
                      </motion.span>
                      <span className="text-xl font-bold text-emerald-800 dark:text-emerald-400">+</span>
                    </div>
                    <span className="block text-xs md:text-sm font-bold text-stone-850 dark:text-stone-200 mt-1 uppercase tracking-wide">{stat.label}</span>
                    <p className="text-stone-750 dark:text-stone-300 text-xs md:text-sm mt-3 leading-relaxed">
                      {stat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setSimulatedStats(prev => ({ ...prev, [stat.key]: prev[stat.key] + 1 }));
                      triggerPop(stat.key);
                    }}
                    className="w-full inline-flex items-center justify-center space-x-1 rounded-xl bg-stone-100 dark:bg-stone-950 hover:bg-emerald-800 dark:hover:bg-emerald-800 text-stone-700 dark:text-stone-300 hover:text-white dark:hover:text-white transition duration-150 active:scale-95 cursor-pointer"
                  >
                    <span>Simulasikan (+1)</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive feedback card when any simulation has run */}
        {totalSimulated > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl p-5 border border-emerald-200/80 dark:border-emerald-800/60 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm"
          >
            <div className="flex items-center space-x-3 text-emerald-950 dark:text-emerald-200">
              <Smile className="h-6 w-6 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <p className="text-xs md:text-sm font-semibold leading-relaxed">
                Luar biasa! Kamu telah menyimulasikan penambahan sebanyak{" "}
                <strong className="text-emerald-900 dark:text-emerald-300">
                  {totalSimulated} kontribusi baru
                </strong>{" "}
                di sistem statistik kami. Mari jadikan langkah nyata ini bagian dari pertumbuhan kesehatan mentalmu bersama psikolog profesional kami!
              </p>
            </div>
            <div className="flex space-x-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setSimulatedStats(Object.fromEntries(STATS_CONFIG.map(s => [s.key, 0])));
                }}
                className="px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 text-[11px] md:text-xs font-bold text-emerald-800 dark:text-emerald-300 transition cursor-pointer"
              >
                Reset Simulasi
              </button>
              <a
                href="#kontak"
                className="px-5 py-2 rounded-xl bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-900 text-[11px] md:text-xs font-bold text-white transition shadow-sm"
              >
                Mulai Konseling Nyata
              </a>
            </div>
          </motion.div>
        )}
      </SectionWrapper>
    </div>
  );
}
