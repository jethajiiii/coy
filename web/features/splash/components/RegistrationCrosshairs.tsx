"use client";

import React from "react";
import { motion } from "framer-motion";

interface RegistrationCrosshairsProps {
  showCrosshairs: boolean;
}

export function RegistrationCrosshairs({
  showCrosshairs,
}: RegistrationCrosshairsProps): React.JSX.Element | null {
  if (!showCrosshairs) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
    >
      {/* Ground Baseline */}
      <div className="absolute w-[240px] h-[2px] bg-black/15 top-[53%] -translate-y-1/2" />

      {/* Left Registration Crosshair */}
      <div className="absolute left-[88px] top-[50%] -translate-y-1/2 flex items-center justify-center">
        <div className="w-8 h-[2px] bg-black" />
        <div className="h-8 w-[2px] bg-black absolute" />
        <div className="w-3 h-3 border border-[#FF2D78] absolute animate-ping opacity-40" />
      </div>

      {/* Center Impact Anchor Mark */}
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-[2px] bg-[#FF2D78]" />
        <div className="h-12 w-[2px] bg-[#FF2D78] absolute" />
        <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-black/40">
          X: 195.0 // Y: 422.0
        </div>
      </div>

      {/* Right Registration Crosshair (Period Landing zone) */}
      <div className="absolute right-[92px] top-[50%] -translate-y-1/2 flex items-center justify-center">
        <div className="w-8 h-[2px] bg-black" />
        <div className="h-8 w-[2px] bg-black absolute" />
        <div className="w-2 h-2 rounded-full bg-[#FF2D78] absolute" />
      </div>
    </motion.div>
  );
}
