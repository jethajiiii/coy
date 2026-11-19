"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { MatchedProfile } from "../types";

interface MatchesGridProps {
  matches: MatchedProfile[];
  loading: boolean;
}

function MatchItem({ match }: { match: MatchedProfile }): React.JSX.Element {
  const [imgErr, setImgErr] = useState(false);
  const initials = match.name.slice(0, 2).toUpperCase();

  return (
    <div className="relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/70 shadow-xs flex flex-col group">
      <div className="relative w-full aspect-3/4 bg-neutral-200 overflow-hidden">
        {!imgErr ? (
          <Image
            src={match.photoUrl}
            alt={match.name}
            fill
            sizes="(max-width: 448px) 50vw, 220px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-orange-300 text-white font-bold text-2xl">
            {initials}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
          <p className="font-bold text-sm truncate">
            {match.name}, <span className="font-normal">{match.age}</span>
          </p>
          <p className="text-[10px] text-neutral-300 truncate">
            📍 {match.city}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MatchesGrid({
  matches,
  loading,
}: MatchesGridProps): React.JSX.Element {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 p-4 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-3/4 bg-neutral-200 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
        <div className="w-14 h-14 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mb-4">
          <Heart size={26} strokeWidth={2} />
        </div>
        <h3 className="text-base font-bold text-neutral-800">
          No matches yet
        </h3>
        <p className="text-xs text-neutral-500 max-w-xs mt-1.5 leading-relaxed">
          When someone you like likes you back, they will appear right here.
          Keep swiping!
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
