"use client";

import React from "react";

export function SkeletonCard(): React.JSX.Element {
  return (
    <div
      role="status"
      aria-label="Loading profiles"
      className="relative w-full h-[520px] rounded-3xl bg-neutral-100 border border-neutral-200/60 shadow-md overflow-hidden flex flex-col animate-pulse"
    >
      {/* Photo Area Skeleton */}
      <div className="w-full h-[360px] bg-neutral-200 relative">
        <div className="absolute bottom-4 left-5 space-y-2">
          <div className="h-6 w-36 bg-neutral-300 rounded-md" />
          <div className="h-4 w-24 bg-neutral-300/80 rounded-md" />
        </div>
      </div>

      {/* Bio & Interest Chips Skeleton */}
      <div className="flex-1 p-5 flex flex-col justify-between bg-white">
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-neutral-200 rounded" />
          <div className="h-3.5 w-4/5 bg-neutral-200 rounded" />
        </div>

        <div className="flex gap-2">
          <div className="h-6 w-20 bg-neutral-200 rounded-full" />
          <div className="h-6 w-16 bg-neutral-200 rounded-full" />
          <div className="h-6 w-24 bg-neutral-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
