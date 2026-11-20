"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SplashScreen } from "@/features/splash/components";

export default function RootPage(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-dvh h-dvh flex flex-col items-center justify-center bg-zinc-900 sm:p-4 select-none antialiased overflow-hidden">
      <div className="w-full max-w-[390px] h-full sm:h-[844px] sm:max-h-[96dvh] bg-[#FFFBEB] sm:border-[3px] sm:border-black sm:rounded-[42px] overflow-hidden flex flex-col relative shadow-[8px_8px_0px_#000000]">
        <SplashScreen onComplete={() => router.push("/discover")} autoPlay={true} />
      </div>
    </div>
  );
}
