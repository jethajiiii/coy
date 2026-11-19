"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, ShieldCheck, MessageSquare } from "lucide-react";
import type { PublicProfile } from "../types";
import { MatchParticles } from "./MatchParticles";
import { DualMatchCards } from "./DualMatchCards";
import { playMatchCelebrationSound } from "../lib/sound";

interface MatchOverlayProps {
  matchedProfile: PublicProfile | null;
  currentUserPhotoUrl?: string;
  matchesCount?: number;
  onKeepSwiping: () => void;
  onViewMatches: () => void;
}

export function MatchOverlay({
  matchedProfile,
  currentUserPhotoUrl = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
  matchesCount = 2,
  onKeepSwiping,
  onViewMatches,
}: MatchOverlayProps): React.JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchedProfile) return;
    playMatchCelebrationSound();
    modalRef.current?.querySelector<HTMLAnchorElement | HTMLButtonElement>("a, button")?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onKeepSwiping();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [matchedProfile, onKeepSwiping]);

  if (!matchedProfile) return null;

  const firstName = matchedProfile.name.split(" ")[0];
  const countDisplay = matchesCount > 0 ? matchesCount : 2;
  const waUrl = `https://wa.me/?text=${encodeURIComponent(`Hey ${firstName}! We just matched on Coy! 🎉`)}`;

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
        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
      >
        <MatchParticles />

        <motion.div
          initial={{ scale: 0.8, y: 25, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
          className="relative w-full max-w-[320px] bg-white border-[3px] border-black rounded-3xl p-5 flex flex-col items-center text-center shadow-[6px_6px_0px_#000] z-30"
        >
          {/* Top Pill Badge */}
          <motion.div
            initial={{ scale: 0, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 450, damping: 18 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-coy-pink border-[2px] border-black shadow-[2.5px_2.5px_0px_#000] text-black font-black text-[10px] tracking-wider uppercase mb-2.5"
          >
            <Sparkles size={13} className="text-black fill-black" />
            <span>MUTUAL CRUSH UNLOCKED</span>
          </motion.div>

          {/* Heading & Subtitle */}
          <h2 id="match-heading" className="text-xl font-black tracking-tight text-black uppercase leading-tight font-display mb-1">
            IT&apos;S A MATCH! 💥
          </h2>
          <p className="text-xs font-medium text-neutral-700 leading-snug px-2 mb-3">
            You and <span className="font-black text-black">{matchedProfile.name}</span> both secretly added each other!
          </p>

          {/* Overlapping Dual Cards Collage */}
          <DualMatchCards
            currentUserPhotoUrl={currentUserPhotoUrl}
            matchedPhotoUrl={matchedProfile.photoUrl}
            matchedName={matchedProfile.name}
          />

          {/* Double-Blind Verified Trust Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border-[2px] border-black shadow-[2.5px_2.5px_0px_#000] text-[9px] font-black uppercase tracking-wider text-black mt-3 mb-4">
            <ShieldCheck size={14} className="text-[#10B981] stroke-[2.5]" />
            <span>100% DOUBLE-BLIND VERIFIED</span>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-2.5">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn w-full py-3 px-4 rounded-2xl bg-coy-pink border-[2.5px] border-black text-black font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-[3.5px_3.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <MessageSquare size={16} strokeWidth={2.5} className="text-black" />
              <span>SAY HI ON WHATSAPP</span>
            </a>

            <button
              type="button"
              onClick={onViewMatches}
              className="brutal-btn w-full py-3 px-4 rounded-2xl bg-coy-yellow border-[2.5px] border-black text-black font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-[3.5px_3.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Heart size={16} strokeWidth={2.5} className="text-black" />
              <span>VIEW MATCHES ({countDisplay})</span>
            </button>

            <button
              type="button"
              onClick={onKeepSwiping}
              className="text-[11px] font-black tracking-widest uppercase text-neutral-800 hover:text-black py-1 mt-0.5 transition-transform active:scale-95 focus-visible:underline"
            >
              KEEP SWIPING
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
