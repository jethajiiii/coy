"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";

interface EmptyStateProps {
  onViewMatches: () => void;
}

export function EmptyState({
  onViewMatches,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div className="w-full h-[520px] rounded-3xl bg-neutral-50 border border-neutral-200/80 p-8 flex flex-col items-center justify-center text-center">
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-rose-200 mb-5">
        <Sparkles size={30} strokeWidth={2.2} />
      </div>

      <h3 className="text-xl font-bold text-neutral-800">
        You&apos;re all caught up!
      </h3>
      <p className="text-xs text-neutral-500 max-w-xs mt-2 mb-6 leading-relaxed">
        You have seen all available profiles in your area for now. Check your
        matches or revisit later!
      </p>

      <button
        type="button"
        onClick={onViewMatches}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 text-white text-xs font-semibold shadow-md hover:bg-neutral-800 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        <Heart size={15} strokeWidth={2.4} fill="currentColor" />
        <span>View Matches</span>
      </button>
    </div>
  );
}
