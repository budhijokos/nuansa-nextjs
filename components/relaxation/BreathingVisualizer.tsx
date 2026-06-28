"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { BreathPhase } from "@/hooks/useBreathingEngine";

interface BreathingVisualizerProps {
  breathStarted: boolean;
  breathPhase: BreathPhase;
  breathSeconds: number;
}

export function BreathingVisualizer({ 
  breathStarted, 
  breathPhase, 
  breathSeconds 
}: BreathingVisualizerProps) {
  const getPhaseText = () => {
    if (!breathStarted) return "Ready";
    switch (breathPhase) {
      case "inhale": return "Tarik Napas";
      case "hold": return "Tahan Napas";
      case "holdExhale": return "Henti Kosong";
      case "exhale": return "Keluarkan";
      default: return "";
    }
  };

  const getSubText = () => {
    if (!breathStarted) return "Sentuh tombol dibawah untuk mulai";
    switch (breathPhase) {
      case "inhale": return "Isi paru-paru penuh hangat";
      case "hold": return "Nikmati ketenangan sel";
      case "exhale": return "Lepaskan beban emosi";
      default: return "Hening sejenak";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 relative">
      <div className="relative w-64 h-64 flex items-center justify-center">
        
        {/* Outer Pulse Rings */}
        <AnimatePresence>
          {breathStarted && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{
                scale: breathPhase === "inhale" ? 1.45 : breathPhase === "exhale" ? 0.95 : 1.45,
                opacity: breathPhase === "hold" || breathPhase === "holdExhale" ? [0.4, 0.6, 0.4] : 0.35,
              }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                duration: breathSeconds,
                ease: "easeInOut",
              }}
              className={`absolute inset-0 rounded-full border-4 ${
                breathPhase === "inhale"
                  ? "border-emerald-300 bg-emerald-500/10"
                  : breathPhase === "hold"
                  ? "border-amber-300 bg-amber-500/5"
                  : "border-emerald-500 bg-emerald-600/5"
              }`}
            />
          )}
        </AnimatePresence>

        {/* Secondary glowing circle blur */}
        <motion.div
          animate={{
            scale: breathStarted
              ? breathPhase === "inhale"
                ? 1.3
                : breathPhase === "exhale"
                ? 0.95
                : 1.3
              : 1,
          }}
          transition={{ duration: breathSeconds, ease: "easeInOut" }}
          className="absolute w-44 h-44 rounded-full bg-emerald-500/10 blur-xl pointer-events-none"
        />

        {/* Main Interactive Circle */}
        <motion.div
          animate={{
            scale: breathStarted
              ? breathPhase === "inhale"
                ? 1.3
                : breathPhase === "exhale"
                ? 0.95
                : 1.3
              : 1,
            borderColor:
              breathPhase === "inhale"
                ? "rgb(16, 185, 129)"
                : breathPhase === "hold"
                ? "rgb(245, 158, 11)"
                : "rgb(4, 120, 87)",
          }}
          transition={{ duration: breathSeconds, ease: "easeInOut" }}
          className="w-48 h-48 rounded-full border-8 bg-stone-900 shadow-2xl flex flex-col items-center justify-center text-center p-6 shrink-0 relative z-10"
        >
          <span className="text-[10px] tracking-widest font-bold uppercase text-stone-400 font-mono">
            {!breathStarted ? "Status" : getPhaseText()}
          </span>
          <span className="text-3xl font-extrabold text-stone-50 my-1 font-mono">
            {!breathStarted ? "Ready" : `${breathSeconds}s`}
          </span>
          <span className="text-[10px] text-stone-500 max-w-[120px] leading-tight">
            {getSubText()}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
