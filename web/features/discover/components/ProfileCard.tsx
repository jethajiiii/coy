"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import type { PublicProfile } from "../types";

interface ProfileCardProps {
  profile: PublicProfile;
  children?: React.ReactNode;
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export function ProfileCard({
  profile,
  children,
}: ProfileCardProps): React.JSX.Element {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <article className="bg-white border-[2.5px] border-black rounded-3xl overflow-hidden shadow-brutal flex flex-col relative w-full h-[475px] sm:h-[490px] select-none">
      {/* Top Status Sticker: Privacy Tag */}
      <div className="absolute top-4 right-4 z-20 bg-coy-yellow border-[2px] border-black font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-tight shadow-brutal-xs rotate-2 flex items-center gap-1.5 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
        <span>MUTUAL ONLY</span>
      </div>

      {/* Overlaid Stamps (LIKE / NOPE from CardStack) */}
      {children}

      {/* Photo Section with Neobrutalist Inner Frame */}
      <div className="p-2.5 pb-0 bg-white">
        <div className="relative h-[230px] sm:h-[245px] w-full border-[2px] border-black rounded-2xl overflow-hidden bg-amber-50">
          {!hasImageError ? (
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              fill
              sizes="(max-width: 448px) 100vw, 448px"
              className="object-cover pointer-events-none"
              priority
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-coy-yellow text-black font-black text-6xl">
              {getInitials(profile.name)}
            </div>
          )}

          {/* Bottom Name Ribbon Overlay */}
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <div className="bg-black text-white px-3 py-1 rounded-xl border-[2px] border-black shadow-brutal-xs flex items-center gap-1.5">
              <span className="text-xs font-black tracking-tight uppercase text-white">
                {profile.name}
              </span>
              <span className="text-coy-yellow text-xs font-black">
                , {profile.age}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio & Profile Details */}
      <div className="p-3.5 flex flex-col justify-between flex-1 bg-white gap-2">
        {/* Campus Location Badge */}
        <div className="flex items-center">
          <span className="inline-flex items-center gap-1 bg-[#FAF8F5] text-black border-[1.5px] border-black px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-tight shadow-brutal-xs uppercase">
            <MapPin size={11} strokeWidth={2.8} />
            <span>{profile.city}</span>
          </span>
        </div>

        {/* Bio Description with Hot Pink Accent Bar */}
        <p className="text-[11.5px] leading-snug font-medium text-neutral-800 border-l-[2.5px] border-[#FF2D78] pl-2 py-0.5 line-clamp-3">
          {profile.bio}
        </p>

        {/* Neobrutalist Interest Chips */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {profile.interests.map((tag, i) => {
            const isLast = i === profile.interests.length - 1;
            return (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9.5px] font-black border-[1.5px] border-black shadow-brutal-xs uppercase ${
                  isLast
                    ? "bg-coy-yellow text-black -rotate-1"
                    : "bg-white text-black"
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </article>
  );
}
