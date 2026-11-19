"use client";

import React from "react";
import { Check, Edit3, Mail, Heart } from "lucide-react";

const STEPS = [
  {
    num: "1",
    title: "Add your crushes",
    desc: "Up to 3 people you know by phone, campus, or vibe. Strictly locked.",
    Icon: Edit3,
    bg: "bg-white",
  },
  {
    num: "2",
    title: "They get a heads-up",
    desc: "Discreet anonymous nudge. Never who. Zero awkward encounters.",
    Icon: Mail,
    bg: "bg-amber-50",
  },
  {
    num: "3",
    title: "Mutual crush? Sparks fly!",
    desc: "You both see the match and celebrate. If not, nobody ever knows.",
    Icon: Heart,
    bg: "bg-rose-50",
  },
] as const;

const PERKS = [
  "We never say who. Not directly, and never through sneaky hints.",
  "Adding is final. No undoing to test who likes who.",
  "Discreet notifications only. Never annoying spams.",
  "Encrypted & double-blind. Keyed hashes keep secrets safe.",
];

export function HowItWorks(): React.JSX.Element {
  return (
    <section className="px-5 py-4 flex flex-col gap-5 border-t-[2.5px] border-black bg-white">
      <div>
        <span className="text-[10px] font-black uppercase text-coy-pink tracking-wider">
          Simple & Stealthy
        </span>
        <h2 className="text-xl font-black text-black uppercase tracking-tight font-display mt-0.5">
          How it works
        </h2>
      </div>

      {/* 3 Step Cards */}
      <div className="flex flex-col gap-2.5">
        {STEPS.map(({ num, title, desc, Icon, bg }) => (
          <div
            key={num}
            className={`${bg} border-[2px] border-black rounded-2xl p-3 shadow-brutal-sm flex items-start gap-3`}
          >
            <div className="w-8 h-8 rounded-xl bg-coy-yellow border-[2px] border-black flex items-center justify-center font-black text-xs shrink-0">
              {num}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs uppercase text-black">{title}</span>
                <Icon size={12} strokeWidth={2.8} className="text-coy-pink" />
              </div>
              <p className="text-[10.5px] text-neutral-600 font-medium leading-tight mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* What if they don't add back guarantee */}
      <div className="bg-[#FAF8F5] border-[2.5px] border-black rounded-2xl p-4 shadow-brutal-sm">
        <h3 className="font-black text-sm uppercase text-black">
          What if they don&apos;t add you back?
        </h3>
        <p className="font-black text-xs text-coy-pink uppercase tracking-tight mt-0.5 mb-3">
          Nothing happens. Absolutely zero.
        </p>

        <div className="space-y-2">
          {PERKS.map((perk) => (
            <div key={perk} className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-[#22C55E] border border-black flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} strokeWidth={3} className="text-black" />
              </div>
              <p className="text-[10.5px] text-neutral-700 font-semibold leading-tight">{perk}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
