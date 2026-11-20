"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RegistrationCrosshairs } from "./RegistrationCrosshairs";
import { KineticDebris } from "./KineticDebris";
import { GlitchScanlines } from "./GlitchScanlines";
import { playSlamSound, playBurstPopSound } from "../lib/splashSound";

interface SplashScreenProps {
  onComplete?: () => void;
  autoPlay?: boolean;
}

const STAGES = ["0 PRE-HIT", "1 SLAM", "2 BURST", "3 GLITCH", "4 SHEAR", "5 READY"];

export function SplashScreen({ onComplete, autoPlay = true }: SplashScreenProps): React.JSX.Element {
  const [phase, setPhase] = useState<number>(0);
  const [isManual, setIsManual] = useState<boolean>(!autoPlay);
  const soundEnabledRef = useRef<boolean>(true);

  const advanceSequence = useCallback(() => {
    const timers = [
      setTimeout(() => { setPhase(1); if (soundEnabledRef.current) playSlamSound(); }, 250),
      setTimeout(() => { setPhase(2); if (soundEnabledRef.current) playBurstPopSound(); }, 600),
      setTimeout(() => setPhase(3), 950),
      setTimeout(() => setPhase(4), 1250),
      setTimeout(() => { setPhase(5); onComplete?.(); }, 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (!autoPlay || isManual) return;
    return advanceSequence();
  }, [autoPlay, isManual, advanceSequence]);

  const handleStep = (step: number) => {
    setIsManual(true);
    setPhase(step);
    if (step === 1 && soundEnabledRef.current) playSlamSound();
    if (step === 2 && soundEnabledRef.current) playBurstPopSound();
  };

  const handleReplay = () => {
    setIsManual(false);
    setPhase(0);
    advanceSequence();
  };

  return (
    <div className="relative w-full h-full bg-[#FFFBEB] flex flex-col justify-between p-5 select-none overflow-hidden font-sans">
      {/* Top Header Controls */}
      <div className="relative z-40 w-full flex items-center justify-between pt-1">
        <span className="px-2 py-0.5 bg-black text-[#FFFBEB] font-mono text-[9px] font-bold uppercase">
          STAGE: {STAGES[phase]}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReplay}
            className="brutal-btn px-2.5 py-1 bg-white border-[1.5px] border-black text-black text-[10px] font-black uppercase shadow-brutal-xs"
          >
            ↺ REPLAY
          </button>
          <button
            type="button"
            onClick={() => { setPhase(5); onComplete?.(); }}
            className="brutal-btn px-2.5 py-1 bg-[#FF2D78] border-[1.5px] border-black text-white text-[10px] font-black uppercase shadow-brutal-xs"
          >
            SKIP →
          </button>
        </div>
      </div>

      {/* Center Animation Canvas */}
      <div className="relative flex-1 flex items-center justify-center">
        <RegistrationCrosshairs showCrosshairs={phase === 0} />
        <KineticDebris showSlamDebris={phase === 1} showDotBurst={phase >= 2 && phase <= 3} />
        <GlitchScanlines showGlitch={phase === 3} showShearExit={phase === 4} />

        {phase >= 1 && phase <= 3 && (
          <motion.div
            initial={{ y: -60, scale: 1.15, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="relative flex items-baseline z-20 pointer-events-none"
          >
            <span className="font-display text-[120px] font-black leading-none text-black tracking-tighter filter drop-shadow-[6px_6px_0px_#000000]">
              coy
            </span>
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 16 }}
                  className="relative inline-flex items-center justify-center ml-2 mb-2"
                >
                  <div className="absolute top-[6px] left-[6px] w-8 h-8 rounded-full bg-black" />
                  <div className="relative w-8 h-8 rounded-full bg-[#FF2D78] border-[2.5px] border-black z-10" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Bottom Frame Stepper */}
      <div className="relative z-40 w-full flex flex-col gap-1.5 pt-2 border-t-[2px] border-black/15">
        <div className="flex items-center justify-between text-[9px] font-mono font-bold text-black/50 uppercase">
          <span>COY MOTION LAB</span>
          <span>FPS: 60 // 390×844PX</span>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {[0, 1, 2, 3, 4].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => handleStep(step)}
              className={`py-1 text-[9px] font-black uppercase rounded border-[1.5px] border-black transition-all ${
                phase === step ? "bg-[#FF2D78] text-white shadow-brutal-xs" : "bg-white text-black hover:bg-neutral-100"
              }`}
            >
              F{step + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
