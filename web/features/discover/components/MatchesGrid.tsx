"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import type { MatchedProfile } from "../types";

function MatchItem({ match }: { match: MatchedProfile }): React.JSX.Element {
  const [imgErr, setImgErr] = useState(false);
  const initials = match.name.slice(0, 2).toUpperCase();

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white border-[2px] border-black flex flex-col"
      style={{ boxShadow: "3px 3px 0px #000" }}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
        {!imgErr ? (
          <Image
            src={match.photoUrl}
            alt={match.name}
            fill
            sizes="(max-width: 448px) 50vw, 220px"
            className="object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-coy-yellow text-black font-black text-2xl">
            {initials}
          </div>
        )}

        {/* Name ribbon overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-black px-3 py-2 pointer-events-none">
          <p className="font-black text-sm text-white truncate uppercase tracking-tight leading-tight">
            {match.name}
            <span className="text-coy-yellow font-black">, {match.age}</span>
          </p>
        </div>

        {/* Mutual badge */}
        <div
          className="absolute top-2 right-2 bg-coy-yellow border-[1.5px] border-black px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight"
          style={{ boxShadow: "1.5px 1.5px 0px #000" }}
        >
          MUTUAL
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#FAF8F5] px-2.5 py-1.5 border-t-[2px] border-black">
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-700 uppercase tracking-tight">
          <MapPin size={10} strokeWidth={2.8} />
          {match.city}
        </span>
      </div>
    </div>
  );
}

function MatchSkeleton(): React.JSX.Element {
  return (
    <div
      className="rounded-2xl overflow-hidden border-[2px] border-black bg-neutral-100"
      style={{ aspectRatio: "3/4", boxShadow: "3px 3px 0px #000" }}
    >
      <div className="w-full h-full skeleton-shimmer" />
    </div>
  );
}

interface MatchesGridProps {
  matches: MatchedProfile[];
  loading: boolean;
}

export function MatchesGrid({
  matches,
  loading,
}: MatchesGridProps): React.JSX.Element {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 p-4">
        {[1, 2, 3, 4].map((i) => (
          <MatchSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <div
          className="w-16 h-16 rounded-2xl bg-coy-yellow border-[2.5px] border-black flex items-center justify-center mb-4"
          style={{ boxShadow: "4px 4px 0px #000" }}
        >
          <Heart size={28} strokeWidth={2.5} className="text-black" />
        </div>
        <h3
          className="text-lg font-black text-black uppercase tracking-tight"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          No Matches Yet
        </h3>
        <p className="text-xs font-semibold text-neutral-500 max-w-[220px] mt-2 leading-relaxed">
          When someone you like likes you back, they appear right here. Keep swiping!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      {matches.map((match) => (
        <MatchItem key={match.id} match={match} />
      ))}
    </div>
  );
}
