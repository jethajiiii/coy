"use client";

import React from "react";
import { X, Heart, Star } from "lucide-react";
import type { SwipeAction } from "../types";

interface ActionButtonsProps {
  onSwipe: (action: SwipeAction) => void;
  disabled?: boolean;
}

export function ActionButtons({
  onSwipe,
  disabled = false,
}: ActionButtonsProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-center gap-3.5 my-auto py-2">
      {/* Pass Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSwipe("PASS")}
        aria-label="Pass on profile"
        className="w-12 h-12 rounded-full bg-white border-[2.5px] border-black flex items-center justify-center text-black shadow-brutal brutal-btn hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <X size={24} strokeWidth={3} />
      </button>

      {/* Signature 'Add as crush' Hot Pink CTA Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSwipe("LIKE")}
        aria-label="Add as secret crush"
        className="flex-1 max-w-[210px] h-12 py-2.5 px-4 rounded-full bg-[#FF2D78] hover:bg-[#e61965] border-[2.5px] border-black flex items-center justify-center gap-2 text-white shadow-brutal brutal-btn font-black text-xs uppercase tracking-wide transition-all disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <Heart size={18} strokeWidth={2.5} fill="white" className="text-white" />
        <span>Add as crush</span>
      </button>

      {/* Star / Instant Crush Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSwipe("LIKE")}
        aria-label="Save for later or super crush"
        className="w-12 h-12 rounded-full bg-coy-yellow border-[2.5px] border-black flex items-center justify-center text-black shadow-brutal brutal-btn hover:bg-[#ffe36e] disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
      >
        <Star size={22} strokeWidth={2.5} fill="black" className="text-black" />
      </button>
    </div>
  );
}
