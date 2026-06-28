"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw, Wind } from "lucide-react";

interface BreathingCycle {
  name: string;
  description: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
}

const BREATHING_PRESETS: BreathingCycle[] = [
  {
    name: "Box Breathing (4-4-4-4)",
    description: "Membantu meredakan serangan cemas instan, menjernihkan pikiran, dan memicu fokus tinggi.",
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4
  },
  {
    name: "Relaksasi Tenang (4-7-8)",
    description: "Sangat ampuh menurunkan hormon stres, mempersiapkan tidur, dan meregulasi sitem saraf.",
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    holdOut: 0
  }
];

export function InteractiveBreathGuide() {
  const [isActive, setIsActive] = useState(false);
  const [presetIndex, setPresetIndex] = useState(0);
  const [phase, setPhase] = useState<"inhale" | "holdIn" | "exhale" | "holdOut">("inhale");
  const [secondsRemaining, setSecondsRemaining] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);

  const currentPreset = BREATHING_PRESETS[presetIndex];

  useEffect(() => {
    // Reset state when preset changes
    setIsActive(false);
    setPhase("inhale");
    setSecondsRemaining(BREATHING_PRESETS[presetIndex].inhale);
    setCompletedCycles(0);
  }, [presetIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActive) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Switch phase
            if (phase === "inhale") {
              if (currentPreset.holdIn > 0) {
                setPhase("holdIn");
                return currentPreset.holdIn;
              } else {
                setPhase("exhale");
                return currentPreset.exhale;
              }
            } else if (phase === "holdIn") {
              setPhase("exhale");
              return currentPreset.exhale;
            } else if (phase === "exhale") {
              if (currentPreset.holdOut > 0) {
                setPhase("holdOut");
                return currentPreset.holdOut;
              } else {
                setCompletedCycles((c) => c + 1);
                setPhase("inhale");
                return currentPreset.inhale;
              }
            } else {
              // holdOut
              setCompletedCycles((c) => c + 1);
              setPhase("inhale");
              return currentPreset.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, phase, currentPreset]);

  // Determine label texts and target scale for smooth animation representation
  let phaseLabel = "Siap untuk Memulai?";
  let phaseInstruction = "Ambil posisi duduk tegak dan rileks.";
  let scaleGoal = 1.0;
  let bgTheme = "bg-stone-100 border-stone-200 text-stone-700";
  let circleColor = "bg-stone-200/50";

  if (isActive) {
    if (phase === "inhale") {
      phaseLabel = "TARIK NAPAS";
      phaseInstruction = "Hirup udara perlahan melalui hidung Anda...";
      scaleGoal = 2.1; // Expand
      bgTheme = "bg-indigo-50 border-indigo-100 text-indigo-900 dark:bg-indigo-950/10 dark:border-indigo-900/30 dark:text-indigo-300";
      circleColor = "bg-indigo-500/30 shadow-lg shadow-indigo-500/20 dark:bg-indigo-500/20 dark:shadow-indigo-500/10";
    } else if (phase === "holdIn") {
      phaseLabel = "TAHAN NAPAS";
      phaseInstruction = "Tahan dengan rileks, rasakan keheningan...";
      scaleGoal = 2.1; // Stay expanded, glow
      bgTheme = "bg-amber-50 border-amber-100 text-amber-900 dark:bg-amber-950/10 dark:border-amber-900/30 dark:text-amber-300";
      circleColor = "bg-amber-400/40 shadow-lg shadow-amber-400/30 animate-pulse dark:bg-amber-400/20 dark:shadow-amber-400/10";
    } else if (phase === "exhale") {
      phaseLabel = "HEMBUSKAN NAPAS";
      phaseInstruction = "Lepaskan beban perlahan lewat mulut...";
      scaleGoal = 1.0; // Shrink
      bgTheme = "bg-emerald-50 border-emerald-100 text-emerald-900 dark:bg-emerald-950/10 dark:border-emerald-900/30 dark:text-emerald-300";
      circleColor = "bg-emerald-500/30 shadow-lg shadow-emerald-500/20 dark:bg-emerald-500/20 dark:shadow-emerald-500/10";
    } else if (phase === "holdOut") {
      phaseLabel = "TAHAN KOSONG";
      phaseInstruction = "Tahan dalam kondisi paru-paru kosong...";
      scaleGoal = 1.0; // Stay small, subtle pulse
      bgTheme = "bg-teal-50 border-teal-100 text-teal-900 dark:bg-teal-950/10 dark:border-teal-900/30 dark:text-teal-300";
      circleColor = "bg-teal-500/20 shadow-md animate-pulse dark:bg-teal-500/10";
    }
  }

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase("inhale");
    setSecondsRemaining(currentPreset.inhale);
    setCompletedCycles(0);
  };

  return (
    <div className="my-12 p-8 rounded-[2.5rem] bg-white dark:bg-[#1a1a19] border border-stone-200 dark:border-stone-850 shadow-xl shadow-stone-900/5 dark:shadow-emerald-950/5 space-y-8 overflow-hidden relative no-print">
      {/* Background calming wind waves */}
      <div className="absolute top-0 right-0 w-32 h-32 text-stone-100 dark:text-stone-900 pointer-events-none -translate-y-4 translate-x-4">
        <Wind className="w-full h-full opacity-[0.03] dark:opacity-[0.1]" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-100 dark:border-stone-850">
        <div>
          <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1 font-mono">
            <Wind className="h-4 w-4" />
            <span>Terapi Jeda Mikro: Ruang Napas</span>
          </div>
          <h3 className="text-xl font-extrabold text-stone-900 dark:text-white">Panduan Latihan Pernapasan</h3>
        </div>

        {/* Preset Selector */}
        <div className="flex space-x-2">
          {BREATHING_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setPresetIndex(idx)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                presetIndex === idx
                  ? "bg-emerald-800 text-white shadow-md shadow-emerald-900/10"
                  : "bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400"
              }`}
            >
              {preset.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed max-w-xl">
        {currentPreset.description}
      </p>

      {/* Main Breathing Stage */}
      <div className="flex flex-col items-center justify-center py-10 space-y-10">
        {/* Animated breathing circle */}
        <div className="relative h-64 w-64 flex items-center justify-center">
          {/* Outer ripples */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                key={phase}
                initial={{ transform: "scale(1)", opacity: 0.4 }}
                animate={{ transform: "scale(2.3)", opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: secondsRemaining, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-emerald-500/20 dark:border-emerald-400/10"
              />
            )}
          </AnimatePresence>

          {/* Central Pulsating core node */}
          <motion.div
            animate={{ scale: scaleGoal }}
            transition={{ duration: secondsRemaining, ease: "easeInOut" }}
            className={`h-24 w-24 rounded-full ${circleColor} flex items-center justify-center transition-all duration-300 z-10`}
          >
            <div className="h-4 w-4 rounded-full bg-white/40" />
          </motion.div>

          {/* Counter text inside circle space */}
          <div className="absolute z-20 flex flex-col items-center justify-center text-center">
            {isActive ? (
              <div className="space-y-1">
                <motion.span
                  key={secondsRemaining}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-mono text-4xl font-extrabold text-stone-900 dark:text-white block"
                >
                  {secondsRemaining}
                </motion.span>
                <span className="text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest block">Detik</span>
              </div>
            ) : (
              <Wind className="h-8 w-8 text-stone-400 dark:text-stone-600 animate-pulse" />
            )}
          </div>
        </div>

        {/* Phase State Indicator */}
        <div className={`w-full max-w-md ${bgTheme} border rounded-3xl p-6 text-center shadow-sm transition-colors duration-500`}>
          <p className="text-[10px] font-bold tracking-widest uppercase mb-1">{phaseLabel}</p>
          <p className="text-sm font-medium leading-relaxed">{phaseInstruction}</p>
        </div>
      </div>

      {/* Breathing Guide Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-stone-100 dark:border-stone-850">
        <div className="text-xs text-stone-400 dark:text-stone-500">
          Siklus Selesai: <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{completedCycles}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            title="Reset latihan"
            className="p-3 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 rounded-full transition cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          
          <button
            onClick={handleToggle}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-bold transition shadow-md cursor-pointer ${
              isActive 
                ? "bg-stone-900 dark:bg-stone-800 text-white hover:bg-stone-800 dark:hover:bg-stone-700 shadow-stone-950/10" 
                : "bg-emerald-800 dark:bg-emerald-700 text-white hover:bg-emerald-950 dark:hover:bg-emerald-600 shadow-emerald-950/20"
            }`}
          >
            {isActive ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
            <span>{isActive ? "Beri Jeda" : "Mulai Latihan"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
