"use client";

import React from "react";
import { Star, MessageSquare, Lock } from "lucide-react";

interface DiscoverHeaderProps {
  activeTab: "discover" | "matches";
  onTabChange: (tab: "discover" | "matches") => void;
  matchesCount: number;
}

export function DiscoverHeader({
  activeTab,
  onTabChange,
  matchesCount,
}: DiscoverHeaderProps): React.JSX.Element {
  return (
    <header className="pt-3 px-4 pb-2 bg-[#FAF8F5] shrink-0 z-10">
      {/* App Branding: 'coy.' logo + '100% anonymous' badge */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div className="flex items-baseline select-none">
          <span className="font-black text-3xl tracking-tight text-[#111116] leading-none lowercase">
            coy
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D78] inline-block ml-0.5" />
        </div>

        <div className="flex items-center gap-1.5 border-[2px] border-black bg-coy-yellow px-2.5 py-1 rounded-full text-xs font-extrabold tracking-tight text-black shadow-brutal-xs -rotate-1 hover:rotate-0 transition-transform">
          <Lock size={12} strokeWidth={2.8} />
          <span className="font-black text-[11px]">100% anonymous</span>
        </div>
      </div>

      {/* Segmented Navigation: Discover vs Matches */}
      <nav
        aria-label="Main Navigation"
        className="bg-white border-[2.5px] border-black p-1 rounded-2xl flex items-center gap-1.5 shadow-brutal-sm"
      >
        <button
          type="button"
          onClick={() => onTabChange("discover")}
          aria-selected={activeTab === "discover"}
          role="tab"
          className={`flex-1 py-1.5 px-3 rounded-xl font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 brutal-btn transition-all ${
            activeTab === "discover"
              ? "bg-[#FF2D78] text-white border-[2px] border-black shadow-brutal-xs"
              : "bg-transparent hover:bg-neutral-100 text-neutral-800 border-[2px] border-transparent"
          }`}
        >
          <Star size={14} strokeWidth={2.8} className={activeTab === "discover" ? "fill-white" : ""} />
          <span>Discover</span>
        </button>

        <button
          type="button"
          onClick={() => onTabChange("matches")}
          aria-selected={activeTab === "matches"}
          role="tab"
          className={`flex-1 py-1.5 px-3 rounded-xl font-black text-xs uppercase tracking-wide flex items-center justify-center gap-1.5 brutal-btn transition-all ${
            activeTab === "matches"
              ? "bg-[#FF2D78] text-white border-[2px] border-black shadow-brutal-xs"
              : "bg-transparent hover:bg-neutral-100 text-neutral-800 border-[2px] border-transparent"
          }`}
        >
          <MessageSquare size={14} strokeWidth={2.8} />
          <span>Matches</span>
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full font-black border border-black ${
              activeTab === "matches"
                ? "bg-coy-yellow text-black"
                : "bg-neutral-100 text-black"
            }`}
          >
            {matchesCount}
          </span>
        </button>
      </nav>
    </header>
  );
}
