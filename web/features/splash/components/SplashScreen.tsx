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

export function SplashScreen({ onComplete, autoPlay = true }: SplashScreenProps): React.JSX.Element {
  const [phase, setPhase] = useState<number>(0);
  const soundEnabledRef = useRef<boolean>(true);

  const advanceSequence = useCallback(() => {
    const timers = [
      setTimeout(() => { setPhase(1); if (soundEnabledRef.current) playSlamSound(); }, 450),
      setTimeout(() => { setPhase(2); if (soundEnabledRef.current) playBurstPopSound(); }, 1100),
      setTimeout(() => setPhase(3), 1750),
      setTimeout(() => setPhase(4), 2250),
      setTimeout(() => { setPhase(5); onComplete?.(); }, 2850),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (!autoPlay) return;
    return advanceSequence();
  }, [autoPlay, advanceSequence]);

  return (
    <div className="relative w-full h-full bg-[#FFFBEB] flex items-center justify-center select-none overflow-hidden font-sans">
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
  );
}
