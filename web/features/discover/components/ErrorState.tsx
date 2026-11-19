"use client";

import React from "react";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({
  message,
  onRetry,
}: ErrorStateProps): React.JSX.Element {
  return (
    <div className="w-full h-[520px] rounded-3xl bg-rose-50/50 border border-rose-200/60 p-8 flex flex-col items-center justify-center text-center">
      <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mb-4">
        <AlertCircle size={28} strokeWidth={2.2} />
      </div>

      <h3 className="text-base font-bold text-neutral-800">
        Unable to load profiles
      </h3>
      <p className="text-xs text-neutral-500 max-w-xs mt-1.5 mb-6">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 text-white text-xs font-semibold shadow-md hover:bg-rose-600 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
      >
        <RotateCcw size={15} strokeWidth={2.2} />
        <span>Try Again</span>
      </button>
    </div>
  );
}
