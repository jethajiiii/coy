"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function MysteryBanner(): React.JSX.Element {
  return (
    <div
      className="mx-4 mb-2 bg-white border-[2px] border-black rounded-2xl px-3 py-2 flex items-center gap-2.5 shrink-0"
      style={{ boxShadow: "2px 2px 0px #000" }}
    >
      <div
        className="w-7 h-7 rounded-full bg-coy-yellow border-[2px] border-black flex items-center justify-center shrink-0"
        style={{ boxShadow: "1px 1px 0px #000" }}
      >
        <MessageCircle size={14} strokeWidth={2.8} className="text-black" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] font-black uppercase tracking-tight text-black">
            A MESSAGE FROM COY
          </span>
          <span className="text-[9px] font-semibold text-neutral-400 shrink-0">now</span>
        </div>
        <p className="text-[10px] leading-tight text-neutral-600 font-medium truncate">
          Someone with your number added you as their secret crush...
        </p>
      </div>
    </div>
  );
}
