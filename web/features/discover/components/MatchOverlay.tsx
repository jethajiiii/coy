"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import type { PublicProfile } from "../types";
import { MatchParticles } from "./MatchParticles";
import { playMatchCelebrationSound } from "../lib/sound";

interface MatchOverlayProps {
  matchedProfile: PublicProfile | null;
  currentUserPhotoUrl?: string;
  onKeepSwiping: () => void;
  onViewMatches: () => void;
}

export function MatchOverlay({
  matchedProfile,
  currentUserPhotoUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
  onKeepSwiping,
  onViewMatches,
}: MatchOverlayProps): React.JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchedProfile) return;
    playMatchCelebrationSound();
    modalRef.current?.querySelector<HTMLButtonElement>("button")?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onKeepSwiping();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [matchedProfile, onKeepSwiping]);

  if (!matchedProfile) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="match-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
      >
        <MatchParticles />

        <motion.div
          initial={{ scale: 0.7, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative w-full max-w-xs bg-[#FAF8F5] border-[3px] border-black rounded-3xl p-5 flex flex-col items-center text-center shadow-[8px_8px_0px_#000] z-30"
        >
          {/* Header Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.12, type: "spring", stiffness: 450, damping: 20 }}
            className="w-12 h-12 rounded-2xl bg-coy-pink border-[2.5px] border-black flex items-center justify-center mb-3 shadow-[3px_3px_0px_#000]"
          >
            <Sparkles size={24} strokeWidth={2.5} className="text-white fill-white" />
          </motion.div>

          <motion.h2
            id="match-heading"
            initial={{ scale: 0.8, y: -8, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.18, type: "spring", stiffness: 380, damping: 20 }}
            className="text-2xl font-black tracking-tight text-black uppercase leading-none mb-1 font-display"
          >
            IT&apos;S A MATCH! 💥
          </motion.h2>

          <p className="text-[11px] font-bold text-neutral-600 mb-5">
            You and <span className="font-black text-black">{matchedProfile.name}</span> both liked each other!
          </p>

          {/* Dual Avatars Collision */}
          <div className="relative flex items-center justify-center w-full my-1 mb-5">
            {/* Impact Shockwave Ripple */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              className="absolute w-16 h-16 rounded-full border-[3px] border-coy-pink pointer-events-none"
            />

            {/* Left Avatar (You) */}
            <motion.div
              initial={{ x: -110, rotate: -15, opacity: 0 }}
              animate={{ x: 0, rotate: -5, opacity: 1 }}
              transition={{ type: "spring", stiffness: 460, damping: 22, delay: 0.08 }}
              className="relative w-20 h-20 rounded-2xl overflow-hidden border-[2.5px] border-black shadow-[3px_3px_0px_#000] z-10"
            >
              <Image src={currentUserPhotoUrl} alt="You" fill sizes="80px" className="object-cover" />
            </motion.div>

            {/* Center Heart Sticker */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.28, type: "spring", stiffness: 450, damping: 14 }}
              className="relative z-20 w-10 h-10 rounded-full bg-coy-yellow border-[2.5px] border-black flex items-center justify-center -mx-2.5 shadow-[2px_2px_0px_#000]"
            >
              <Heart size={18} strokeWidth={2.8} fill="black" className="text-black" />
            </motion.div>

            {/* Right Avatar (Match) */}
            <motion.div
              initial={{ x: 110, rotate: 15, opacity: 0 }}
              animate={{ x: 0, rotate: 5, opacity: 1 }}
              transition={{ type: "spring", stiffness: 460, damping: 22, delay: 0.08 }}
              className="relative w-20 h-20 rounded-2xl overflow-hidden border-[2.5px] border-black shadow-[3px_3px_0px_#000] z-10"
            >
              <Image src={matchedProfile.photoUrl} alt={matchedProfile.name} fill sizes="80px" className="object-cover" />
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-2">
            <button
              type="button"
              onClick={onViewMatches}
              className="brutal-btn w-full py-3 rounded-2xl bg-coy-pink border-[2.5px] border-black text-white font-black text-xs uppercase tracking-wide shadow-[4px_4px_0px_#000] focus-visible:ring-2 focus-visible:ring-black"
            >
              VIEW MATCHES
            </button>
            <button
              type="button"
              onClick={onKeepSwiping}
              className="brutal-btn w-full py-2.5 rounded-2xl bg-white border-[2.5px] border-black text-black font-black text-xs uppercase tracking-wide shadow-[3px_3px_0px_#000] focus-visible:ring-2 focus-visible:ring-black"
            >
              KEEP SWIPING
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
