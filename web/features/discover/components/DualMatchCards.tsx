"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";

interface DualMatchCardsProps {
  currentUserPhotoUrl: string;
  matchedPhotoUrl: string;
  matchedName: string;
}

export function DualMatchCards({
  currentUserPhotoUrl,
  matchedPhotoUrl,
  matchedName,
}: DualMatchCardsProps): React.JSX.Element {
  const firstName = matchedName.split(" ")[0];

  return (
    <div className="relative flex items-center justify-center w-full h-32 my-1">
      {/* Left User Card */}
      <motion.div
        initial={{ x: -70, rotate: -18, opacity: 0 }}
        animate={{ x: 0, rotate: -6, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.12 }}
        className="relative w-24 h-32 rounded-2xl overflow-hidden border-[2.5px] border-black bg-neutral-100 shadow-[3px_3px_0px_#000] -mr-3 z-10"
      >
        <Image src={currentUserPhotoUrl} alt="You" fill sizes="96px" className="object-cover" priority />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-lg bg-white border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000] text-[9px] font-black uppercase text-black z-20">
          YOU
        </div>
      </motion.div>

      {/* Center Heart Sticker */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 480, damping: 14 }}
        className="absolute z-20 w-11 h-11 rounded-full bg-coy-yellow border-[2.5px] border-black flex items-center justify-center shadow-[2.5px_2.5px_0px_#000]"
      >
        <Heart size={18} fill="black" strokeWidth={0} className="text-black" />
      </motion.div>

      {/* Right Matched Profile Card */}
      <motion.div
        initial={{ x: 70, rotate: 18, opacity: 0 }}
        animate={{ x: 0, rotate: 6, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.12 }}
        className="relative w-24 h-32 rounded-2xl overflow-hidden border-[2.5px] border-black bg-neutral-100 shadow-[3px_3px_0px_#000] -ml-3 z-10"
      >
        <Image src={matchedPhotoUrl} alt={matchedName} fill sizes="96px" className="object-cover" priority />
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-lg bg-white border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000] text-[9px] font-black uppercase text-black z-20 truncate max-w-[80px]">
          {firstName}
        </div>
      </motion.div>
    </div>
  );
}
