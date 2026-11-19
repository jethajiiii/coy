"use client";

import { useState, useCallback } from "react";
import { postSwipe } from "../api";
import type { PublicProfile, SwipeAction } from "../types";

export interface UseSwipeOptions {
  queue: PublicProfile[];
  setQueue: React.Dispatch<React.SetStateAction<PublicProfile[]>>;
}

export interface UseSwipeReturn {
  swipe: (action: SwipeAction) => Promise<boolean>;
  latestMatch: PublicProfile | null;
  clearMatch: () => void;
  error: string | null;
  isSwiping: boolean;
}

export function useSwipe({ queue, setQueue }: UseSwipeOptions): UseSwipeReturn {
  const [latestMatch, setLatestMatch] = useState<PublicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  const clearMatch = useCallback(() => {
    setLatestMatch(null);
  }, []);

  const swipe = useCallback(
    async (action: SwipeAction): Promise<boolean> => {
      const target = queue[0];
      if (!target || isSwiping) return false;

      // Optimistically remove top card immediately
      setQueue((prev) => prev.slice(1));
      setError(null);
      setIsSwiping(true);

      try {
        const response = await postSwipe(target.id, action);
        if (response.matched && response.profile) {
          setLatestMatch(response.profile);
        }
        return response.matched;
      } catch (err) {
        // Rollback: restore the card back to the top of the queue on network/server failure
        setQueue((prev) => [target, ...prev]);
        setError(err instanceof Error ? err.message : "Swipe failed. Please try again.");
        return false;
      } finally {
        setIsSwiping(false);
      }
    },
    [queue, setQueue, isSwiping]
  );

  return {
    swipe,
    latestMatch,
    clearMatch,
    error,
    isSwiping,
  };
}
