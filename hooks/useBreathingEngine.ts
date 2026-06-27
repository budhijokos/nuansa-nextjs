"use client";

import { useState, useEffect } from "react";

export type BreathType = "478" | "box" | "equal";
export type BreathPhase = "inhale" | "hold" | "exhale" | "holdExhale";

export function useBreathingEngine() {
  const [breathType, setBreathType] = useState<BreathType>("box");
  const [breathPhase, setBreathPhase] = useState<BreathPhase>("inhale");
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [breathStarted, setBreathStarted] = useState(false);
  const [breathCycles, setBreathCycles] = useState(0);

  useEffect(() => {
    if (!breathStarted) {
      return;
    }

    const interval = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev <= 1) {
          let nextPhase: BreathPhase = "inhale";
          let nextSecs = 4;

          if (breathType === "box") {
            if (breathPhase === "inhale") {
              nextPhase = "hold";
              nextSecs = 4;
            } else if (breathPhase === "hold") {
              nextPhase = "exhale";
              nextSecs = 4;
            } else if (breathPhase === "exhale") {
              nextPhase = "holdExhale";
              nextSecs = 4;
            } else {
              nextPhase = "inhale";
              nextSecs = 4;
              setBreathCycles((c) => c + 1);
            }
          } else if (breathType === "478") {
            if (breathPhase === "inhale") {
              nextPhase = "hold";
              nextSecs = 7;
            } else if (breathPhase === "hold") {
              nextPhase = "exhale";
              nextSecs = 8;
            } else {
              nextPhase = "inhale";
              nextSecs = 4;
              setBreathCycles((c) => c + 1);
            }
          } else if (breathType === "equal") {
            if (breathPhase === "inhale") {
              nextPhase = "exhale";
              nextSecs = 5;
            } else {
              nextPhase = "inhale";
              nextSecs = 5;
              setBreathCycles((c) => c + 1);
            }
          }

          setBreathPhase(nextPhase);
          return nextSecs;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathStarted, breathPhase, breathType]);

  const resetBreathing = () => {
    setBreathStarted(false);
    setBreathPhase("inhale");
    setBreathSeconds(breathType === "equal" ? 5 : 4);
    setBreathCycles(0);
  };

  const toggleBreathing = () => {
    setBreathStarted(!breathStarted);
    if (!breathStarted) {
      setBreathCycles(0);
    }
  };

  const changeBreathType = (type: BreathType) => {
    setBreathType(type);
    setBreathStarted(false);
    setBreathPhase("inhale");
    setBreathSeconds(type === "equal" ? 5 : 4);
    setBreathCycles(0);
  };

  return {
    breathType,
    breathPhase,
    breathSeconds,
    breathStarted,
    breathCycles,
    resetBreathing,
    toggleBreathing,
    changeBreathType
  };
}
