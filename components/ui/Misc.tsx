import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Quote, Sparkles } from "lucide-react";
import { ScrollReveal } from "./Animations";
import { MILESTONES } from "@/lib/history-data";

export function QuoteBackground() {
  return (
    <div className="absolute top-6 left-6 -z-10 opacity-[0.04] text-stone-900 select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity duration-500">
      <Quote className="h-20 w-20 transform -translate-x-4 -translate-y-4" />
    </div>
  );
}

export function StaggeredBadge({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function BestValueBadge({ show }: { show: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: -5 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-[9px] font-bold uppercase tracking-wider animate-pulse transition-all ${show ? "opacity-100" : "opacity-0"}`}
    >
      <Sparkles className="h-2 w-2" />
      <span>Best Value</span>
    </motion.div>
  );
}

export function GlassIcon({ icon: Icon, color = "emerald", className = "" }: { icon: any, color?: "emerald" | "stone" | "amber", className?: string }) {
  const bgColors = { emerald: "bg-emerald-500/10", stone: "bg-stone-500/10", amber: "bg-amber-500/10" };
  const borderColors = { emerald: "border-emerald-500/20", stone: "border-stone-500/20", amber: "border-amber-500/20" };
  const textColors = { emerald: "text-emerald-800", stone: "text-stone-800", amber: "text-amber-800" };

  return (
    <div className={`relative ${className} group/glass`}>
      <div className={`absolute inset-0 rounded-2xl blur-lg -rotate-12 scale-110 opacity-70 group-hover/glass:rotate-0 group-hover/glass:scale-125 transition-all duration-700 ${bgColors[color]}`} />
      <div className={`absolute inset-0 rounded-2xl blur-[2px] rotate-6 scale-95 opacity-40 group-hover/glass:rotate-0 transition-all duration-700 ${bgColors[color]}`} />
      
      <div className={`relative z-10 flex items-center justify-center h-16 w-16 rounded-2xl border backdrop-blur-xl shadow-inner shadow-white/40 transition-all duration-500 group-hover/glass:-translate-y-1.5 group-hover/glass:shadow-xl ${bgColors[color]} ${borderColors[color]}`}>
        <Icon className={`h-8 w-8 ${textColors[color]} drop-shadow-sm`} />
      </div>
    </div>
  );
}

export function HistoryTimeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative py-12">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-stone-200 dark:bg-stone-800 -translate-x-[0.25px] h-full" />
      
      <motion.div 
        style={{ scaleY, originY: 0 }}
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-800 -translate-x-[0.25px] z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)] h-full"
      />

      <div className="space-y-16 relative z-20">
        {MILESTONES.map((item, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.1}>
            <div className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center`}>
              <div className={`flex-1 w-full pl-12 mb-4 md:mb-0 ${idx % 2 === 0 ? "md:pl-0 md:pr-16" : "md:pl-16 md:pr-0"}`}>
                <div className={`p-6 rounded-2xl bg-white dark:bg-[#1a1a19] border border-stone-100 dark:border-stone-850 shadow-sm hover:shadow-md transition-shadow duration-300 relative group overflow-hidden ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className={`absolute top-0 w-1 h-full bg-emerald-800 left-0 ${idx % 2 === 0 ? "md:left-auto md:right-0" : "md:left-0 md:right-auto"}`} />
                  <span className="text-2xl font-black text-stone-100 dark:text-stone-800/40 group-hover:text-emerald-50/40 dark:group-hover:text-emerald-950/20 transition-colors duration-500 absolute top-2 right-4 pointer-events-none select-none">{item.year}</span>
                  <h4 className="text-base font-bold text-stone-900 dark:text-white mb-2 relative z-10">{item.title}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed relative z-10 italic md:not-italic">{item.desc}</p>
                </div>
              </div>

              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center translate-y-8 md:translate-y-0">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="h-4 w-4 rounded-full bg-white dark:bg-stone-900 border-4 border-emerald-800 dark:border-emerald-700 z-30 shadow-lg" 
                />
                <div className={`hidden md:block absolute ${idx % 2 === 0 ? "left-full ml-4" : "right-full mr-4"} whitespace-nowrap`}>
                   <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 font-mono">{item.year}</span>
                </div>
              </div>

              <div className="hidden md:block flex-1" />
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
