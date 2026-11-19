"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, Flame } from "lucide-react";
import type { PublicProfile } from "../types";

interface MatchOverlayProps {
  matchedProfile: PublicProfile | null;
  currentUserPhotoUrl?: string;
  onKeepSwiping: () => void;
  onViewMatches: () => void;
}

function useModalFocus(
  active: boolean,
  onEscape: () => void
): React.RefObject<HTMLDivElement | null> {
  const modalRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!active) return;

    const firstBtn = modalRef.current?.querySelector<HTMLButtonElement>("button");
    firstBtn?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onEscape(); return; }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>("button");
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, onEscape]);

  return modalRef;
}

export function MatchOverlay({
  matchedProfile,
  currentUserPhotoUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
  onKeepSwiping,
  onViewMatches,
}: MatchOverlayProps): React.JSX.Element | null {
  const modalRef = useModalFocus(!!matchedProfile, onKeepSwiping);

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
        className="absolute inset-0 z-50 flex items-center justify-center p-5"
        style={{ background: "rgba(0,0,0,0.88)" }}
      >
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.75, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="w-full max-w-xs bg-[#FAF8F5] border-[3px] border-black rounded-3xl p-6 flex flex-col items-center text-center"
          style={{ boxShadow: "8px 8px 0px #000" }}
        >
          {/* Header Icon */}
          <div
            className="w-14 h-14 rounded-2xl bg-coy-pink border-[2.5px] border-black flex items-center justify-center mb-4"
            style={{ boxShadow: "3px 3px 0px #000" }}
          >
            <Flame size={28} strokeWidth={2.5} className="text-white" fill="white" />
          </div>

          <h2
            id="match-heading"
            className="text-3xl font-black tracking-tight text-black uppercase leading-none mb-1"
            style={{ fontFamily: "var(--font-grotesk, 'Space Grotesk', sans-serif)" }}
          >
            IT&apos;S A MATCH! 💥
          </h2>
          <p className="text-[11px] font-semibold text-neutral-600 mb-5">
            You and <span className="font-black text-black">{matchedProfile.name}</span> both liked each other.
          </p>

          {/* Dual Avatars */}
          <div className="flex items-center justify-center gap-0 mb-6">
            <div
              className="relative w-20 h-20 rounded-2xl overflow-hidden border-[2.5px] border-black"
              style={{ boxShadow: "3px 3px 0px #000", zIndex: 1 }}
            >
              <Image
                src={currentUserPhotoUrl}
                alt="Your avatar"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div
              className="relative z-10 w-10 h-10 rounded-full bg-coy-yellow border-[2.5px] border-black flex items-center justify-center -mx-2"
              style={{ boxShadow: "2px 2px 0px #000" }}
            >
              <Heart size={18} strokeWidth={2.5} fill="black" className="text-black" />
            </div>

            <div
              className="relative w-20 h-20 rounded-2xl overflow-hidden border-[2.5px] border-black"
              style={{ boxShadow: "3px 3px 0px #000", zIndex: 1 }}
            >
              <Image
                src={matchedProfile.photoUrl}
                alt={matchedProfile.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={onViewMatches}
              className="brutal-btn w-full py-3.5 rounded-2xl bg-coy-pink border-[2.5px] border-black text-white font-black text-xs uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              style={{ boxShadow: "4px 4px 0px #000" }}
            >
              VIEW MATCHES
            </button>

            <button
              type="button"
              onClick={onKeepSwiping}
              className="brutal-btn w-full py-3 rounded-2xl bg-white border-[2.5px] border-black text-black font-black text-xs uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
              style={{ boxShadow: "3px 3px 0px #000" }}
            >
              KEEP SWIPING
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
