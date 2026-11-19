"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";

interface StampProps {
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
}

export function LikeStamp({ opacity, scale, rotate }: StampProps): React.JSX.Element {
  return (
    <motion.div
      style={{
        boxShadow: "4px 4px 0px #000",
        opacity,
        scale,
        rotate,
      }}
      className="absolute top-6 left-6 z-30 border-[3px] border-black text-black bg-[#22C55E] px-4 py-1.5 rounded-2xl text-2xl font-black tracking-wider uppercase pointer-events-none"
    >
      CRUSH! 🔥
    </motion.div>
  );
}

export function NopeStamp({ opacity, scale, rotate }: StampProps): React.JSX.Element {
  return (
    <motion.div
      style={{
        boxShadow: "4px 4px 0px #000",
        opacity,
        scale,
        rotate,
      }}
      className="absolute top-6 right-6 z-30 border-[3px] border-black text-white bg-[#FF2D78] px-4 py-1.5 rounded-2xl text-2xl font-black tracking-wider uppercase pointer-events-none"
    >
      PASS ✕
    </motion.div>
  );
}
