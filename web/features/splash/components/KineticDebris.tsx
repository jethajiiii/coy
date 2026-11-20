"use client";

import React from "react";
import { motion } from "framer-motion";

interface KineticDebrisProps {
  showSlamDebris: boolean;
  showDotBurst: boolean;
}

export function KineticDebris({
  showSlamDebris,
  showDotBurst,
}: KineticDebrisProps): React.JSX.Element {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {/* 4 Heavy Black Kinetic Blast Spokes */}
      {showSlamDebris && (
        <div className="absolute w-[280px] h-[280px]">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            className="absolute -top-4 -left-3 w-10 h-[5px] bg-black -rotate-45 shadow-[2px_2px_0px_#FF2D78] origin-right"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            className="absolute -bottom-2 -left-4 w-12 h-[5px] bg-black rotate-35 shadow-[2px_2px_0px_#FF2D78] origin-right"
          />
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            className="absolute -top-8 left-12 w-[5px] h-9 bg-black -rotate-12 origin-bottom"
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            className="absolute bottom-3 left-4 w-14 h-[6px] bg-black rotate-6 origin-left"
          />

          {/* Hot-pink micro-debris particles */}
          <motion.div
            initial={{ scale: 0, x: -10, y: 10 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            className="absolute -top-7 left-3 w-3 h-3 bg-[#FF2D78] border-2 border-black rotate-12"
          />
          <motion.div
            initial={{ scale: 0, x: 10, y: -10 }}
            animate={{ scale: 1, x: 0, y: 0 }}
            className="absolute -bottom-6 left-1 w-2.5 h-2.5 bg-[#FF2D78] border-2 border-black -rotate-45"
          />
          <div className="absolute top-8 -left-8 w-2 h-2 rounded-full bg-[#FF2D78]" />
          <div className="absolute bottom-10 -left-6 w-3 h-3 bg-black rotate-45" />
        </div>
      )}

      {/* Signature Hot-Pink Period Radial Burst */}
      {showDotBurst && (
        <div className="absolute w-44 h-44 pointer-events-none translate-x-[72px] translate-y-3">
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-4 right-5 w-1.5 h-4 bg-[#FF2D78] rotate-20"
          />
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-2 right-1 w-4 h-1.5 bg-black rotate-45"
          />
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-3 -right-2 w-5 h-1.5 bg-[#FF2D78]"
          />
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-3 right-5 w-1.5 h-4 bg-black -rotate-30"
          />
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -bottom-2 right-1 w-3.5 h-1.5 bg-[#FF2D78] -rotate-45"
          />
          <div className="absolute -top-5 right-2 font-mono font-black text-[#FF2D78] text-sm">
            +
          </div>
        </div>
      )}
    </div>
  );
}
