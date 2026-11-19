"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotate: number;
  color: string;
  shape: "circle" | "square" | "pill";
}

const COLORS = ["#FF2D78", "#FFDE59", "#22C55E", "#121216", "#FAF8F5"];

export function MatchParticles(): React.JSX.Element {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * 360 * (Math.PI / 180);
      const distance = 80 + (i % 5) * 22;
      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0.6 + (i % 3) * 0.35,
        rotate: (i * 45) % 360,
        color: COLORS[i % COLORS.length]!,
        shape: i % 3 === 0 ? "circle" : i % 3 === 1 ? "square" : "pill",
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: p.y,
            scale: [0, p.scale, 0],
            opacity: [1, 1, 0],
            rotate: p.rotate * 2,
          }}
          transition={{
            duration: 0.9,
            ease: [0.18, 0.89, 0.32, 1.28],
            delay: 0.2 + (p.id % 4) * 0.04,
          }}
          className={`absolute border-[1.5px] border-black ${
            p.shape === "circle"
              ? "w-3 h-3 rounded-full"
              : p.shape === "square"
              ? "w-2.5 h-2.5 rounded-sm"
              : "w-4 h-2 rounded-full"
          }`}
          style={{ backgroundColor: p.color, boxShadow: "1.5px 1.5px 0px #000" }}
        />
      ))}
    </div>
  );
}
