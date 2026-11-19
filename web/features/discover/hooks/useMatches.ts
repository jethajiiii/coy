"use client";

import { useState, useEffect, useCallback } from "react";
import { getMatches } from "../api";
import type { MatchedProfile } from "../types";

export interface UseMatchesReturn {
  matches: MatchedProfile[];
  count: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useMatches(): UseMatchesReturn {
  const [matches, setMatches] = useState<MatchedProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMatches();
      setMatches(data.matches);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load matches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    getMatches()
      .then((data) => {
        if (!cancelled) {
          setMatches(data.matches);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load matches");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    matches,
    count: matches.length,
    loading,
    error,
    refetch: fetchMatches,
  };
}
