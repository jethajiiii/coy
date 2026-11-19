"use client";

import React from "react";

export function SkeletonCard(): React.JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading profiles"
      className="relative w-full h-[475px] rounded-3xl bg-white border-[2.5px] border-black overflow-hidden flex flex-col"
      style={{ boxShadow: "4px 4px 0px #000" }}
    >
      {/* Photo skeleton */}
      <div className="p-2.5 pb-0">
        <div className="relative h-[230px] w-full border-[2px] border-black rounded-2xl overflow-hidden">
          <div className="w-full h-full skeleton-shimmer" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-3.5 flex flex-col gap-3 flex-1">
        {/* Location chip */}
        <div className="h-5 w-28 rounded-full border-[1.5px] border-black skeleton-shimmer" />

        {/* Bio lines */}
        <div className="border-l-[2.5px] border-coy-pink pl-2 space-y-1.5">
          <div className="h-3 w-full rounded skeleton-shimmer" />
          <div className="h-3 w-4/5 rounded skeleton-shimmer" />
          <div className="h-3 w-3/5 rounded skeleton-shimmer" />
        </div>

        {/* Interest chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[64, 48, 80, 56].map((w) => (
            <div
              key={w}
              className="h-5 rounded-full border-[1.5px] border-black skeleton-shimmer"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>

      <span className="sr-only">Loading profile cards…</span>
    </div>
  );
}
