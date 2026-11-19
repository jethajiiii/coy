"use client";

import React from "react";
import Link from "next/link";
import { Lock, Heart, MessageCircle } from "lucide-react";

export function HomeHero(): React.JSX.Element {
  return (
    <section className="px-5 pt-4 pb-6 flex flex-col gap-4">
      {/* Brand Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline">
          <span className="font-black text-3xl tracking-tight text-black lowercase leading-none">
            coy
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-coy-pink inline-block ml-0.5" />
        </div>

        <div className="flex items-center gap-1.5 border-[2px] border-black bg-coy-yellow px-2.5 py-1 rounded-full text-xs font-black shadow-brutal-xs">
          <Lock size={12} strokeWidth={2.8} />
          <span className="text-[10px]">100% anonymous</span>
        </div>
      </div>

      {/* Main Catchy Hero Headline */}
      <div className="pt-2">
        <h1 className="text-3xl font-black text-black uppercase tracking-tight leading-[1.08] font-display">
          Find out if your crush likes you back.
        </h1>
        <p className="text-xs font-medium text-neutral-600 mt-2.5 leading-relaxed">
          Add them secretly. If they add you too, sparks fly 💥. If not, nobody ever knows (your secret is safe with us forever).
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/discover"
        className="brutal-btn w-full py-3.5 px-6 rounded-full bg-coy-pink border-[2.5px] border-black text-white font-black text-xs uppercase tracking-wide flex items-center justify-center gap-2 shadow-brutal"
      >
        <Heart size={16} strokeWidth={2.8} fill="white" />
        <span>Add Your Crushes</span>
      </Link>
      <span className="text-[10px] text-center font-bold text-neutral-400 -mt-2">
        Free for your first 3 crushes • 100% private
      </span>

      {/* Interactive Floating Preview Cards (from screenshot 1) */}
      <div className="relative pt-2 pb-1 flex flex-col gap-2.5">
        {/* Card 1: Mysterious Coy Notification */}
        <div className="bg-white border-[2.5px] border-black rounded-2xl p-3 shadow-brutal-sm -rotate-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-coy-yellow border-[1.5px] border-black flex items-center justify-center">
              <MessageCircle size={12} strokeWidth={2.8} className="text-black" />
            </div>
            <span className="text-[10px] font-black uppercase text-black">A message from Coy</span>
            <span className="text-[9px] font-bold text-neutral-400 ml-auto">now</span>
          </div>
          <p className="text-[10px] leading-snug font-medium text-neutral-700">
            Heads up: Someone who has your number added you as their secret crush on Coy... 👀
          </p>
        </div>

        {/* Card 2: Match Preview */}
        <div className="bg-coy-pink border-[2.5px] border-black rounded-2xl p-3.5 text-white shadow-brutal rotate-1">
          <div className="flex items-center justify-center gap-0 mb-2">
            <div className="w-9 h-9 rounded-full bg-white border-[2px] border-black flex items-center justify-center text-black font-black text-xs">
              You
            </div>
            <div className="w-6 h-6 rounded-full bg-coy-yellow border-[2px] border-black flex items-center justify-center -mx-1.5 z-10">
              <Heart size={11} strokeWidth={3} fill="black" className="text-black" />
            </div>
            <div className="w-9 h-9 rounded-full bg-white border-[2px] border-black flex items-center justify-center text-black font-black text-xs">
              Riya
            </div>
          </div>
          <p className="text-center font-black text-sm uppercase tracking-tight">It&apos;s a match!</p>
          <p className="text-center text-[10px] text-pink-100 font-medium">You and Riya from 3rd floor added each other</p>
        </div>
      </div>
    </section>
  );
}
