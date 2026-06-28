"use client";

import React from "react";
import { BreathType } from "@/hooks/useBreathingEngine";

interface BreathingPresetSelectorProps {
  currentType: BreathType;
  onChange: (type: BreathType) => void;
}

export function BreathingPresetSelector({ currentType, onChange }: BreathingPresetSelectorProps) {
  const presets: { type: BreathType; label: string }[] = [
    { type: "box", label: "Box Breathing (4s)" },
    { type: "478", label: "4-7-8 Sleep (Calm)" },
    { type: "equal", label: "Sama Rata (5s)" },
  ];

  return (
    <div className="grid grid-cols-3 gap-1 bg-stone-100 dark:bg-stone-900 p-1.5 rounded-xl border border-stone-200 dark:border-stone-800">
      {presets.map((preset) => (
        <button
          key={preset.type}
          onClick={() => onChange(preset.type)}
          className={`text-center py-2 text-xs font-bold rounded-lg transition duration-200 ${
            currentType === preset.type
              ? "bg-white dark:bg-stone-800 text-emerald-800 dark:text-emerald-400 shadow-sm"
              : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200"
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
