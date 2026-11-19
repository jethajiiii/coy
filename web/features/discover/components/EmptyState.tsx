"use client";

import React from "react";
import { Heart, Sparkles, RotateCcw } from "lucide-react";

interface EmptyStateProps {
  onViewMatches: () => void;
  onReset?: () => void;
  isResetting?: boolean;
}

export function EmptyState({
  onViewMatches,
  onReset,
  isResetting = false,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div
      className="w-full h-full max-h-[460px] rounded-3xl bg-[#FAF8F5] border-[2.5px] border-black flex flex-col items-center justify-center text-center p-6 shadow-[4px_4px_0px_#000]"
    >
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-3xl bg-coy-yellow border-[2.5px] border-black flex items-center justify-center mb-4 rotate-3 shadow-[4px_4px_0px_#000]"
      >
        <Sparkles size={32} strokeWidth={2} className="text-black" />
      </div>

      <h3
        className="text-2xl font-black text-black uppercase tracking-tight leading-tight mb-1 font-display"
      >
        YOU&apos;RE ALL
        <br />
        CAUGHT UP!
      </h3>
      <p className="text-[11px] font-semibold text-neutral-500 max-w-[220px] mb-5 leading-relaxed">
        You&apos;ve swiped on all available profiles. View your mutual crushes or reset the demo feed!
      </p>

      <div className="w-full max-w-[210px] space-y-2">
        <button
          type="button"
          onClick={onViewMatches}
          className="brutal-btn w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-coy-pink border-[2.5px] border-black text-white font-black text-xs uppercase tracking-wide shadow-[3px_3px_0px_#000] focus-visible:ring-2 focus-visible:ring-black"
        >
          <Heart size={15} strokeWidth={2.5} fill="white" className="text-white" />
          <span>VIEW MATCHES</span>
        </button>

        {onReset && (
          <button
            type="button"
            disabled={isResetting}
            onClick={onReset}
            className="brutal-btn w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-coy-yellow border-[2.5px] border-black text-black font-black text-xs uppercase tracking-wide shadow-[3px_3px_0px_#000] disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-black"
          >
            <RotateCcw size={14} strokeWidth={2.5} className={isResetting ? "animate-spin" : ""} />
            <span>{isResetting ? "RESETTING..." : "RESET DEMO FEED"}</span>
          </button>
        )}
      </div>
    </div>
  );
}
