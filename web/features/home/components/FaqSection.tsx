"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, ArrowRight } from "lucide-react";

const FAQS = [
  {
    q: "What is Coy?",
    a: "Coy is a privacy-first, double-blind crush app. You add people you secretly adore. If they add you too, you match. Otherwise, nobody ever knows.",
  },
  {
    q: "Can they work out it was me?",
    a: "Nope! We never reveal inbound likes, counts, or clues. Your crush only finds out if they independently crush on you too.",
  },
  {
    q: "What if they're not on Coy yet?",
    a: "When they eventually join and add you, the match triggers automatically! Your secret crush stays locked in encrypted storage.",
  },
  {
    q: "Is it really free?",
    a: "Your first 3 crushes are 100% free forever. No subscriptions or hidden credit cards required.",
  },
] as const;

export function FaqSection(): React.JSX.Element {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="px-5 py-5 flex flex-col gap-5 border-t-[2.5px] border-black bg-[#FAF8F5]">
      {/* Pricing Teaser */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] font-black uppercase text-black">Launch Promo</span>
          <span className="bg-coy-pink text-white text-[9px] font-black px-1.5 py-0.2 rounded border border-black uppercase">
            Free
          </span>
        </div>
        <h3 className="text-lg font-black text-black uppercase font-display leading-tight">
          Your first 3 crushes are free.
        </h3>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-white border-[2px] border-black rounded-xl p-2.5 text-center shadow-brutal-xs">
            <span className="text-[9px] font-black uppercase text-neutral-500">+1 Crush</span>
            <p className="text-sm font-black text-black mt-0.5">₹49</p>
          </div>
          <div className="bg-rose-50 border-[2px] border-black rounded-xl p-2.5 text-center shadow-brutal-xs">
            <span className="text-[9px] font-black uppercase text-coy-pink">+3 Crushes</span>
            <p className="text-sm font-black text-black mt-0.5">₹129</p>
          </div>
          <div className="bg-coy-yellow border-[2px] border-black rounded-xl p-2.5 text-center shadow-brutal-xs relative">
            <span className="text-[8px] font-black uppercase bg-black text-coy-yellow px-1 rounded absolute -top-2 left-1/2 -translate-x-1/2">
              BEST
            </span>
            <span className="text-[9px] font-black uppercase text-black">+5 Crushes</span>
            <p className="text-sm font-black text-black mt-0.5">₹199</p>
          </div>
        </div>
      </div>

      {/* Accordion Questions */}
      <div>
        <h3 className="text-base font-black text-black uppercase font-display mb-2.5">
          Questions?
        </h3>
        <div className="flex flex-col gap-2">
          {FAQS.map(({ q, a }, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={q}
                className="bg-white border-[2px] border-black rounded-xl overflow-hidden shadow-brutal-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-2.5 px-3 flex items-center justify-between text-left font-black text-xs uppercase tracking-tight text-black"
                >
                  <span>{q}</span>
                  <ChevronDown
                    size={14}
                    strokeWidth={2.8}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 pt-0.5 text-[11px] font-medium text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final Catchy Pink Banner Card */}
      <div className="bg-coy-pink border-[2.5px] border-black rounded-2xl p-4 text-white shadow-brutal flex flex-col items-center text-center gap-2">
        <Sparkles size={22} className="text-coy-yellow fill-coy-yellow" />
        <h4 className="text-base font-black uppercase tracking-tight font-display leading-tight">
          Someone you know might already have added you.
        </h4>
        <p className="text-[10.5px] font-medium text-pink-100 max-w-[220px]">
          Don&apos;t keep them wondering in silence. See who is waiting on Discover!
        </p>
        <Link
          href="/discover"
          className="brutal-btn mt-1 inline-flex items-center gap-1.5 py-2 px-5 rounded-full bg-coy-yellow border-[2px] border-black text-black font-black text-xs uppercase tracking-wider shadow-brutal-xs"
        >
          <span>Start Swiping</span>
          <ArrowRight size={13} strokeWidth={3} />
        </Link>
      </div>
    </section>
  );
}
