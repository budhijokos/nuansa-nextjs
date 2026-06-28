"use client";
import React, { useEffect, useRef } from "react";
import { Wind, Music } from "lucide-react";
import { motion } from "motion/react";
import { ScrollReveal, TiltCard } from "@/components/ui/Animations";
import { StaggeredBadge } from "@/components/ui/Misc";
import { useTheme } from "@/components/ThemeProvider";
import { useRelaxationAudio } from "@/hooks/useRelaxationAudio";
import { useBreathingEngine } from "@/hooks/useBreathingEngine";
import { BreathingVisualizer } from "@/components/relaxation/BreathingVisualizer";
import { BreathingPresetSelector } from "@/components/relaxation/BreathingPresetSelector";
import { AudioControls } from "@/components/relaxation/AudioControls";

interface RelaxationSectionProps {
  setCursorLabel: (label: string | null) => void;
}

import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function RelaxationSection({ setCursorLabel }: RelaxationSectionProps) {
  const { isDark } = useTheme();
  
  // Custom Hooks
  const { 
    audioActive, 
    ambientSounds, 
    setAmbientSounds, 
    masterVolume, 
    setMasterVolume, 
    toggleAudio 
  } = useRelaxationAudio();

  const {
    breathType,
    breathPhase,
    breathSeconds,
    breathStarted,
    breathCycles,
    resetBreathing,
    toggleBreathing,
    changeBreathType
  } = useBreathingEngine();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animation logic for the wave visualizer (moved from main file to keep it cleaner)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waveCount = 3;
      const baseAmp = 12;
      const colors = [
        "rgba(16, 185, 129, 0.12)", // emerald-500
        "rgba(52, 211, 153, 0.08)", // emerald-400
        "rgba(4, 120, 87, 0.05)"    // emerald-700
      ];

      offset += 0.015;

      for (let i = waveCount - 1; i >= 0; i--) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        
        const f = 0.005 + i * 0.0025;
        let amp = baseAmp + i * 6;
        if (audioActive) {
          if (ambientSounds.ocean) amp += 15;
          if (ambientSounds.theta) amp += 8;
          if (ambientSounds.zen) amp += 4;
        }
        
        const speed = offset * (1 + i * 0.25);

        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 15) {
          const y = canvas.height * 0.6 + Math.sin(x * f + speed) * amp;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      // Floating ambient particles reflect active audio frequencies
      if (audioActive) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.25)";
        for (let k = 0; k < 8; k++) {
          const px = (Math.sin(offset * 0.3 + k * 1.7) * 0.45 + 0.5) * canvas.width;
          const py = (Math.cos(offset * 0.23 + k * 2.1) * 0.4 + 0.5) * canvas.height;
          ctx.beginPath();
          ctx.arc(px, py, 1.5 + (k % 2), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [audioActive, ambientSounds]);

  return (
    <SectionWrapper 
      id="relaksasi" 
      className="border-t border-stone-200/50 dark:border-stone-850 bg-stone-50 dark:bg-stone-950"
      onMouseEnter={() => setCursorLabel("Breathe")}
      onMouseLeave={() => setCursorLabel(null)}
      badge="Panduan Self-Calming"
      title="Panduan Relaksasi Mandiri"
      description="Rileksasikan pikiranmu dalam 2-3 menit. Gunakan pemandu pernapasan ritmik interaktif dan alunan soundscape alami yang dirintis khusus untuk mereduksi ketegangan fisik serta kecemasan kognitif seketika."
    >
      {/* Dynamic Immersive Background that fades based on breathing phase */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          backgroundColor: !breathStarted 
            ? "rgba(250, 250, 249, 0)" 
            : breathPhase === "inhale" 
            ? (isDark ? "rgba(4, 120, 87, 0.15)" : "rgba(209, 250, 229, 0.4)") 
            : breathPhase === "exhale" 
            ? (isDark ? "rgba(26, 26, 25, 0.4)" : "rgba(245, 245, 244, 0.8)") 
            : (isDark ? "rgba(180, 83, 9, 0.1)" : "rgba(255, 251, 235, 0.3)")
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left box: Breath Guide Component */}
        <div className="lg:col-span-6">
          <TiltCard className="h-full">
            <div className="bg-white dark:bg-[#1a1a19] rounded-3xl border border-stone-200 dark:border-stone-850 p-8 shadow-xl flex flex-col justify-between h-full min-h-[550px] relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wind className="h-5 w-5 text-emerald-700 dark:text-emerald-500 animate-pulse" />
                    <h3 className="text-lg font-bold text-stone-950 dark:text-white">Panduan Napas Ritmik</h3>
                  </div>
                  <span className="text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 px-2.5 py-1 rounded border border-emerald-100 dark:border-emerald-900/30">
                    Latihan: {breathCycles} Siklus
                  </span>
                </div>

                <BreathingPresetSelector 
                  currentType={breathType} 
                  onChange={changeBreathType} 
                />
              </div>

              <BreathingVisualizer 
                breathStarted={breathStarted}
                breathPhase={breathPhase}
                breathSeconds={breathSeconds}
              />

              <div className="flex space-x-3 mt-4">
                <button
                  onClick={toggleBreathing}
                  className={`flex-1 py-3 px-6 rounded-2xl text-xs font-bold transition-all duration-200 shadow-md ${
                    breathStarted
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-emerald-800 text-white hover:bg-emerald-950"
                  }`}
                >
                  {breathStarted ? "Pause Latihan" : "Mulai Latihan Napas"}
                </button>
                {breathStarted && (
                  <button
                    onClick={resetBreathing}
                    className="py-3 px-5 rounded-2xl text-xs font-bold border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Right box: Soundscape Audio Control Panel */}
        <div className="lg:col-span-6">
          <TiltCard className="h-full">
            <div className="bg-white dark:bg-[#1a1a19] rounded-3xl border border-stone-200 dark:border-stone-850 p-8 shadow-xl flex flex-col justify-between h-full min-h-[550px] relative">
              <AudioControls 
                audioActive={audioActive}
                ambientSounds={ambientSounds}
                setAmbientSounds={setAmbientSounds}
                masterVolume={masterVolume}
                setMasterVolume={setMasterVolume}
                toggleAudio={toggleAudio}
                canvasRef={canvasRef}
              />
            </div>
          </TiltCard>
        </div>

      </div>
    </SectionWrapper>
  );
}

