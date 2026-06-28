"use client";

import React from "react";
import { Brain, Check, Sparkles, Volume2, VolumeX, Wind } from "lucide-react";
import { AmbientSounds } from "@/hooks/useRelaxationAudio";

interface AudioControlsProps {
  audioActive: boolean;
  ambientSounds: AmbientSounds;
  setAmbientSounds: React.Dispatch<React.SetStateAction<AmbientSounds>>;
  masterVolume: number;
  setMasterVolume: (v: number) => void;
  toggleAudio: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export function AudioControls({
  audioActive,
  ambientSounds,
  setAmbientSounds,
  masterVolume,
  setMasterVolume,
  toggleAudio,
  canvasRef
}: AudioControlsProps) {
  
  const tracks = [
    { 
      id: "theta" as keyof AmbientSounds, 
      icon: Brain, 
      title: "Frekuensi Damai (Theta 6Hz)", 
      desc: "Sinyal binaural merangsang relaksasi saraf kognitif dalam" 
    },
    { 
      id: "ocean" as keyof AmbientSounds, 
      icon: Wind, 
      title: "Angin Hutan & Deburan Ombak", 
      desc: "Simulasi deburan ombak laut alami dengan resonansi biofilik" 
    },
    { 
      id: "zen" as keyof AmbientSounds, 
      icon: Sparkles, 
      title: "Tibetan Bowl & Zen Resonance", 
      desc: "Lonceng spiritual bernada pentatonis rileks pembersih stres" 
    },
  ];

  return (
    <div className="space-y-6 h-full flex flex-col justify-between">
      <div className="space-y-6">
        {/* Card Header & Master Play */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="h-5 w-5 text-emerald-700 dark:text-emerald-500" />
            <h3 className="text-lg font-bold text-stone-950 dark:text-white">Sensory Ambient Soundscape</h3>
          </div>
          <button
            onClick={toggleAudio}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-100 shadow-sm ${
              audioActive
                ? "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20"
                : "bg-emerald-800 text-stone-50 hover:bg-emerald-950 dark:hover:bg-emerald-900"
            }`}
          >
            {audioActive ? (
              <>
                <VolumeX className="h-3.5 w-3.5 animate-pulse" />
                <span>Matikan Musik</span>
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5" />
                <span>Nyalakan Alunan</span>
              </>
            )}
          </button>
        </div>

        {/* Premium Wave Visualizer Canvas */}
        <div className="relative h-28 bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 flex items-center justify-center p-4">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-x-4 top-3 flex items-center justify-between z-10">
            <div className="flex items-center space-x-1">
              <Sparkles className={`h-3.5 w-3.5 text-emerald-400 ${audioActive ? "animate-pulse" : "opacity-30"}`} />
              <span className="text-[10px] font-mono tracking-wider text-stone-400">ORGANIC WAVE ANALYZER</span>
            </div>
            <span className="text-[8px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-900">
              {audioActive ? "Synthesizer Live" : "Muted"}
            </span>
          </div>
        </div>

        {/* Soundscape List Items */}
        <div className="space-y-3.5">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 block">Pilih Layer Suara yang Ingin Digabung:</span>
          
          {tracks.map((track) => {
            const Icon = track.icon;
            const isActive = ambientSounds[track.id];
            
            return (
              <div
                key={track.id}
                onClick={() => {
                  setAmbientSounds((prev) => ({ ...prev, [track.id]: !prev[track.id] }));
                }}
                className={`flex items-center justify-between p-4 rounded-2xl border transition duration-150 cursor-pointer ${
                  isActive
                    ? "border-emerald-600 dark:border-emerald-550 bg-emerald-500/5 dark:bg-emerald-950/10 shadow-sm"
                    : "border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shadow-inner ${
                    isActive 
                      ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-400" 
                      : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white leading-none">{track.title}</h4>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 mt-1">{track.desc}</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                  isActive ? "border-emerald-700 bg-emerald-800" : "border-stone-300 dark:border-stone-700"
                }`}>
                  {isActive && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Volume Slider Controllers */}
      <div className="space-y-2 mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
          <span>Volume Master Swadiri</span>
          <span>{Math.round(masterVolume * 100)}%</span>
        </div>
        <div className="flex items-center space-x-3">
          <VolumeX className="h-4 w-4 text-stone-400 dark:text-stone-500" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={masterVolume}
            onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
            className="flex-1 h-1.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-800 dark:accent-emerald-700"
          />
          <Volume2 className="h-4 w-4 text-emerald-800 dark:text-emerald-500" />
        </div>
        {!audioActive && (
          <p className="text-[10px] text-amber-600 dark:text-amber-400 text-center font-medium mt-1 animate-pulse">
            * Sentuh tombol &quot;Nyalakan Alunan&quot; diatas terlebih dahulu demi memicu suara.
          </p>
        )}
      </div>
    </div>
  );
}
