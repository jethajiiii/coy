"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import type { PublicProfile } from "../types";

interface MatchOverlayProps {
  matchedProfile: PublicProfile | null;
  currentUserPhotoUrl?: string;
  onKeepSwiping: () => void;
  onViewMatches: () => void;
}

export function MatchOverlay({
  matchedProfile,
  currentUserPhotoUrl = "https://randomuser.me/api/portraits/lego/1.jpg",
  onKeepSwiping,
  onViewMatches,
}: MatchOverlayProps): React.JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchedProfile) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onKeepSwiping();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>("button");
        if (focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    const firstBtn = modalRef.current?.querySelector<HTMLButtonElement>("button");
    firstBtn?.focus();

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
        className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl flex flex-col items-center border border-rose-100"
        >
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-3">
            <Sparkles size={24} strokeWidth={2.5} />
          </div>

          <h2
            id="match-heading"
            className="text-3xl font-black tracking-tight text-neutral-900 bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent"
          >
            It&apos;s a Match!
          </h2>
          <p className="text-xs text-neutral-500 mt-1 mb-6">
            You and <span className="font-semibold text-neutral-800">{matchedProfile.name}</span> liked each other.
          </p>

          {/* Dual Avatars */}
          <div className="relative flex items-center justify-center mb-8 w-full">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl -mr-4 z-10">
              <Image
                src={currentUserPhotoUrl}
                alt="Your avatar"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md z-30 -mx-3 border-2 border-white">
              <Heart size={20} strokeWidth={2.5} fill="currentColor" />
            </div>

            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl -ml-4 z-10">
              <Image
                src={matchedProfile.photoUrl}
                alt={matchedProfile.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-2.5">
            <button
              type="button"
              onClick={onViewMatches}
              className="w-full py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs shadow-lg shadow-rose-200 active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
            >
              View Matches
            </button>

            <button
              type="button"
              onClick={onKeepSwiping}
              className="w-full py-3 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium text-xs active:scale-98 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
