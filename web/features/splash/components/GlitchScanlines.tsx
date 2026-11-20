"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlitchScanlinesProps {
  showGlitch: boolean;
  showShearExit: boolean;
}

export function GlitchScanlines({
  showGlitch,
  showShearExit,
}: GlitchScanlinesProps): React.JSX.Element | null {
  if (showShearExit) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        <div className="relative w-[340px] h-[160px] flex flex-col justify-between overflow-hidden">
          {/* 6 Staggered Shear Ribbons with alternating displacements */}
          {[
            { shift: -28, streakRight: true, top: "0px" },
            { shift: 36, streakRight: false, top: "-24px" },
            { shift: -44, streakRight: true, top: "-48px" },
            { shift: 48, streakRight: false, top: "-72px" },
            { shift: -32, streakRight: true, top: "-96px" },
            { shift: 24, streakRight: false, top: "-120px" },
          ].map((ribbon, idx) => (
            <motion.div
              key={idx}
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: ribbon.shift * 6, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="h-6 overflow-hidden relative"
            >
              <div
                className="font-display font-black text-[120px] leading-none text-black tracking-tighter absolute left-12 select-none"
                style={{ top: ribbon.top }}
              >
                coy<span className="text-[#FF2D78]">.</span>
              </div>
              {ribbon.streakRight ? (
                <div className="absolute right-8 top-2 w-20 h-1 bg-[#FF2D78]" />
              ) : (
                <div className="absolute left-2 top-3 w-16 h-1 bg-black" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (showGlitch) {
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        {/* Horizontal fracture scanlines */}
        <div className="absolute w-full h-[3px] bg-black top-[48%] opacity-85" />
        <div className="absolute w-[85%] h-[2px] bg-[#FF2D78] top-[52%] left-4 opacity-90" />
        <div className="absolute w-[65%] h-[4px] bg-black top-[55%] right-2 opacity-75" />

        {/* Off-axis Hot-Pink Outline Ghost Copy (-8px offset) */}
        <div className="absolute -translate-x-2 -translate-y-2 flex items-baseline pointer-events-none opacity-85 select-none">
          <span
            className="font-display text-[128px] font-black leading-none text-transparent tracking-tighter"
            style={{ WebkitTextStroke: "2.5px #FF2D78" }}
          >
            coy
          </span>
          <div className="w-7 h-7 rounded-full border-[3px] border-[#FF2D78] ml-2 mb-2" />
        </div>
      </div>
    );
  }

  return null;
}
