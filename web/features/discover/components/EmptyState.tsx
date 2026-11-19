"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";

interface EmptyStateProps {
  onViewMatches: () => void;
}

export function EmptyState({
  onViewMatches,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div
      className="w-full h-full max-h-[460px] rounded-3xl bg-[#FAF8F5] border-[2.5px] border-black flex flex-col items-center justify-center text-center p-8"
      style={{ boxShadow: "4px 4px 0px #000" }}
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-3xl bg-coy-yellow border-[2.5px] border-black flex items-center justify-center mb-5 rotate-3"
        style={{ boxShadow: "4px 4px 0px #000" }}
      >
        <Sparkles size={36} strokeWidth={2} className="text-black" />
      </div>

      <h3
        className="text-2xl font-black text-black uppercase tracking-tight leading-tight mb-2"
        style={{ fontFamily: "var(--font-grotesk, sans-serif)" }}
      >
        YOU&apos;RE ALL
        <br />
        CAUGHT UP!
      </h3>
      <p className="text-[11px] font-semibold text-neutral-500 max-w-[220px] mb-7 leading-relaxed">
        You&apos;ve seen everyone for now. Check your matches or come back later!
      </p>

      <button
        type="button"
        onClick={onViewMatches}
        className="brutal-btn inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-coy-pink border-[2.5px] border-black text-white font-black text-xs uppercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        style={{ boxShadow: "4px 4px 0px #000" }}
      >
        <Heart size={15} strokeWidth={2.5} fill="white" className="text-white" />
        <span>VIEW MATCHES</span>
      </button>
    </div>
  );
}
