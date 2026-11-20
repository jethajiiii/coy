"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/features/splash/components";

export default function SplashPage(): React.JSX.Element {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/discover");
  };

  return (
    <div className="min-h-dvh h-dvh flex flex-col items-center justify-center bg-zinc-900 sm:p-4 select-none antialiased overflow-hidden">
      {/* 390x844px Mobile Viewport Phone Mockup Frame */}
      <div
        className="w-full max-w-[390px] h-full sm:h-[844px] sm:max-h-[96dvh] bg-[#FFFBEB] sm:border-[3px] sm:border-black sm:rounded-[42px] overflow-hidden flex flex-col relative"
        style={{ boxShadow: "0 0 0 0px transparent" }}
      >
        <div
          className="hidden sm:block absolute inset-0 pointer-events-none rounded-[42px]"
          style={{ boxShadow: "8px 8px 0px #000000", zIndex: 50 }}
          aria-hidden="true"
        />

        <SplashScreen onComplete={handleComplete} autoPlay={true} />
      </div>
    </div>
  );
}
