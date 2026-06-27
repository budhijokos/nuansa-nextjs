"use client";

import React, { useState, useEffect, useRef } from "react";

export interface AmbientSounds {
  theta: boolean;
  ocean: boolean;
  zen: boolean;
}

export function useRelaxationAudio() {
  const [audioActive, setAudioActive] = useState(false);
  const [ambientSounds, setAmbientSounds] = useState<AmbientSounds>({
    theta: false,
    ocean: false,
    zen: false
  });
  const [masterVolume, setMasterVolume] = useState(0.55);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const thetaOsc1Ref = useRef<OscillatorNode | null>(null);
  const thetaOsc2Ref = useRef<OscillatorNode | null>(null);
  const thetaGainRef = useRef<GainNode | null>(null);

  const oceanNoiseRef = useRef<AudioBufferSourceNode | null>(null);
  const oceanFilterRef = useRef<BiquadFilterNode | null>(null);
  const oceanLfoRef = useRef<OscillatorNode | null>(null);
  const oceanLfoGainRef = useRef<GainNode | null>(null);
  const oceanGainRef = useRef<GainNode | null>(null);

  const zenIntervalRef = useRef<any>(null);
  const zenGainRef = useRef<GainNode | null>(null);

  const createWaveNoise = (audioContext: AudioContext) => {
    const bufferSize = 2 * audioContext.sampleRate;
    const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }
    
    const noiseNode = audioContext.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;
    return noiseNode;
  };

  const startZenInterval = (ctx: AudioContext, gainNode: GainNode) => {
    const playZenBell = () => {
      const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];
      const freq = scale[Math.floor(Math.random() * scale.length)];
      const now = ctx.currentTime;
      
      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const bellGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(freq * 1.5, now);

      bellGain.gain.setValueAtTime(0, now);
      bellGain.gain.linearRampToValueAtTime(0.15, now + 0.15);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(bellGain);
      subOsc.connect(bellGain);
      bellGain.connect(gainNode);

      osc.start(now);
      subOsc.start(now);

      osc.stop(now + 5.0);
      subOsc.stop(now + 5.0);
    };

    playZenBell();
    zenIntervalRef.current = window.setInterval(playZenBell, 7000);
  };

  const toggleAudio = () => {
    if (!audioActive) {
      try {
        const AudioCtxClass = (window.AudioContext || (window as any).webkitAudioContext);
        const ctx = new AudioCtxClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(masterVolume, ctx.currentTime);
        masterGain.connect(ctx.destination);
        masterGainRef.current = masterGain;

        const thetaOsc1 = ctx.createOscillator();
        const thetaOsc2 = ctx.createOscillator();
        const thetaGain = ctx.createGain();
        thetaOsc1.frequency.setValueAtTime(100, ctx.currentTime);
        thetaOsc2.frequency.setValueAtTime(106, ctx.currentTime);
        thetaGain.gain.setValueAtTime(ambientSounds.theta ? 0.35 : 0.0, ctx.currentTime);
        thetaOsc1.connect(thetaGain);
        thetaOsc2.connect(thetaGain);
        thetaGain.connect(masterGain);
        thetaOsc1.start();
        thetaOsc2.start();

        thetaOsc1Ref.current = thetaOsc1;
        thetaOsc2Ref.current = thetaOsc2;
        thetaGainRef.current = thetaGain;

        const waveSrc = createWaveNoise(ctx);
        const filter = ctx.createBiquadFilter();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const oceanGain = ctx.createGain();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        filter.Q.setValueAtTime(2.0, ctx.currentTime);

        lfo.frequency.setValueAtTime(0.11, ctx.currentTime);
        lfoGain.gain.setValueAtTime(200, ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        waveSrc.connect(filter);
        filter.connect(oceanGain);
        oceanGain.connect(masterGain);

        oceanGain.gain.setValueAtTime(ambientSounds.ocean ? 0.45 : 0.0, ctx.currentTime);
        waveSrc.start();
        lfo.start();

        oceanNoiseRef.current = waveSrc;
        oceanFilterRef.current = filter;
        oceanLfoRef.current = lfo;
        oceanLfoGainRef.current = lfoGain;
        oceanGainRef.current = oceanGain;

        const zenGain = ctx.createGain();
        zenGain.gain.setValueAtTime(ambientSounds.zen ? 0.3 : 0.0, ctx.currentTime);
        zenGain.connect(masterGain);
        zenGainRef.current = zenGain;

        startZenInterval(ctx, zenGain);

        setAudioActive(true);
      } catch (err) {
        console.error("Failed to start audio engine", err);
      }
    } else {
      if (zenIntervalRef.current) {
        window.clearInterval(zenIntervalRef.current);
        zenIntervalRef.current = null;
      }
      try {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
        }
      } catch (e) {}
      audioCtxRef.current = null;
      setAudioActive(false);
    }
  };

  useEffect(() => {
    if (!audioActive || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(masterVolume, ctx.currentTime, 0.15);
    }
    if (thetaGainRef.current) {
      thetaGainRef.current.gain.setTargetAtTime(ambientSounds.theta ? 0.35 : 0.0, ctx.currentTime, 0.25);
    }
    if (oceanGainRef.current) {
      oceanGainRef.current.gain.setTargetAtTime(ambientSounds.ocean ? 0.45 : 0.0, ctx.currentTime, 0.25);
    }
    if (zenGainRef.current) {
      zenGainRef.current.gain.setTargetAtTime(ambientSounds.zen ? 0.3 : 0.0, ctx.currentTime, 0.25);
    }
  }, [ambientSounds, masterVolume, audioActive]);

  useEffect(() => {
    return () => {
      if (zenIntervalRef.current) window.clearInterval(zenIntervalRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  return {
    audioActive,
    ambientSounds,
    setAmbientSounds,
    masterVolume,
    setMasterVolume,
    toggleAudio
  };
}
