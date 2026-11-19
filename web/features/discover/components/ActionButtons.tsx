"use client";

import React from "react";
import { X, Heart } from "lucide-react";
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
    <div className="flex items-center justify-center gap-6 py-4">
      {/* Pass / Nope Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSwipe("PASS")}
        aria-label="Pass on profile"
        className="group relative w-16 h-16 rounded-full bg-white border border-neutral-200/80 shadow-md flex items-center justify-center text-neutral-400 hover:text-rose-500 hover:border-rose-300 hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
      >
        <X
          size={30}
          strokeWidth={2.6}
          className="transition-transform group-hover:scale-110"
        />
      </button>

      {/* Like Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onSwipe("LIKE")}
        aria-label="Like profile"
        className="group relative w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white shadow-rose-200 shadow-lg flex items-center justify-center hover:from-rose-600 hover:to-rose-500 hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
      >
        <Heart
          size={30}
          strokeWidth={2.6}
          fill="currentColor"
          className="transition-transform group-hover:scale-110"
        />
      </button>
    </div>
  );
}
