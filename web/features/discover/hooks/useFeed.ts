"use client";

import { useState, useEffect, useCallback } from "react";
import { getFeed } from "../api";
import type { PublicProfile } from "../types";

export interface UseFeedReturn {
  queue: PublicProfile[];
  setQueue: React.Dispatch<React.SetStateAction<PublicProfile[]>>;
  current: PublicProfile | null;
  next: PublicProfile | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  retry: () => Promise<void>;
}

export function useFeed(): UseFeedReturn {
  const [queue, setQueue] = useState<PublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeed = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFeed();
      setQueue(data.profiles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    getFeed()
      .then((data) => {
        if (!cancelled) {
          setQueue(data.profiles);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load feed");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const current = queue[0] ?? null;
  const next = queue[1] ?? null;
  const isEmpty = !loading && queue.length === 0;

  return {
    queue,
    setQueue,
    current,
    next,
    loading,
    error,
    isEmpty,
    retry: fetchFeed,
  };
}
