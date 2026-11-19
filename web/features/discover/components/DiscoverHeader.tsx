"use client";

import React from "react";

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
    <header className="px-5 pt-4 pb-2 shrink-0">
      <div className="flex bg-neutral-100 p-1 rounded-2xl border border-neutral-200/70">
        <button
          type="button"
          onClick={() => onTabChange("discover")}
          aria-selected={activeTab === "discover"}
          role="tab"
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
            activeTab === "discover"
              ? "bg-white text-rose-500 shadow-sm"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          Discover
        </button>

        <button
          type="button"
          onClick={() => onTabChange("matches")}
          aria-selected={activeTab === "matches"}
          role="tab"
          className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 flex items-center justify-center gap-1.5 ${
            activeTab === "matches"
              ? "bg-white text-rose-500 shadow-sm"
              : "text-neutral-500 hover:text-neutral-800"
          }`}
        >
          <span>Matches</span>
          <span
            className={`text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === "matches"
                ? "bg-rose-100 text-rose-600"
                : "bg-neutral-200 text-neutral-600"
            }`}
          >
            {matchesCount}
          </span>
        </button>
      </div>
    </header>
  );
}
