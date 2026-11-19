"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    <div className="relative w-full h-[520px] rounded-3xl bg-white shadow-xl overflow-hidden flex flex-col border border-neutral-100 select-none">
      {/* Photo Container or Initials Fallback */}
      <div className="relative w-full h-[360px] bg-neutral-200 overflow-hidden">
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-400 to-orange-300 text-white font-bold text-6xl">
            {getInitials(profile.name)}
          </div>
        )}

        {/* Gradient shadow for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

        {/* Overlaid Stamps (LIKE / NOPE) */}
        {children}

        {/* Primary Name, Age & Location on Image Bottom */}
        <div className="absolute bottom-4 inset-x-5 text-white pointer-events-none">
          <h2 className="text-2xl font-bold tracking-tight drop-shadow-md">
            {profile.name},{" "}
            <span className="font-semibold">{profile.age}</span>
          </h2>
          <p className="text-sm text-neutral-200 font-medium drop-shadow-sm flex items-center gap-1 mt-0.5">
            <span>📍</span> {profile.city}
          </p>
        </div>
      </div>

      {/* Details Container: Bio & Interest Chips */}
      <div className="flex-1 p-5 flex flex-col justify-between overflow-hidden bg-white">
        <p className="text-xs sm:text-sm text-neutral-700 leading-snug line-clamp-3 font-normal">
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2">
          {profile.interests.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-200/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
