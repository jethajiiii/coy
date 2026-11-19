"use client";

import React, { useState, useRef, useCallback } from "react";
import { useFeed, useSwipe, useMatches } from "@/features/discover/hooks";
import {
  DiscoverHeader,
  CardStack,
  CardStackRef,
  ActionButtons,
  MysteryBanner,
  MatchOverlay,
  MatchesGrid,
  EmptyState,
  SkeletonCard,
  ErrorState,
} from "@/features/discover/components";
import type { SwipeAction } from "@/features/discover/types";
import { apiClient } from "@/lib/api-client";

export default function DiscoverPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<"discover" | "matches">("discover");
  const [isResetting, setIsResetting] = useState(false);
  const cardStackRef = useRef<CardStackRef>(null);

  const {
    queue,
    setQueue,
    current,
    next,
    loading: feedLoading,
    error: feedError,
    isEmpty,
    retry: retryFeed,
  } = useFeed();

  const {
    swipe,
    latestMatch,
    clearMatch,
    error: swipeError,
    isSwiping,
  } = useSwipe({ queue, setQueue });

  const {
    matches,
    count: matchesCount,
    loading: matchesLoading,
    refetch: refetchMatches,
  } = useMatches();

  const handleSwipeAction = useCallback(
    async (action: SwipeAction) => {
      const isMatched = await swipe(action);
      if (isMatched) void refetchMatches();
    },
    [swipe, refetchMatches]
  );

  const handleResetDemo = useCallback(async () => {
    setIsResetting(true);
    try {
      await apiClient("/dev/reset", { method: "POST" });
      retryFeed();
      void refetchMatches();
    } finally {
      setIsResetting(false);
    }
  }, [retryFeed, refetchMatches]);

  const handleButtonSwipe = useCallback((action: SwipeAction) => {
    cardStackRef.current?.swipe(action);
  }, []);

  const handleViewMatchesFromOverlay = useCallback(() => {
    clearMatch();
    setActiveTab("matches");
    void refetchMatches();
  }, [clearMatch, refetchMatches]);

  const showBanner = !feedLoading && !feedError && !isEmpty && activeTab === "discover";

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] relative overflow-hidden">
      <DiscoverHeader activeTab={activeTab} onTabChange={setActiveTab} matchesCount={matchesCount} />

      {showBanner && <MysteryBanner />}

      <div className={`flex-1 flex flex-col px-4 pb-1 relative ${activeTab === "discover" ? "overflow-hidden" : "overflow-y-auto"}`}>
        {activeTab === "discover" ? (
          <div className="flex-1 flex flex-col justify-between items-center w-full h-full overflow-hidden">
            <div className="w-full flex-1 flex items-center justify-center relative min-h-0">
              {feedLoading ? (
                <SkeletonCard />
              ) : feedError ? (
                <ErrorState message={feedError} onRetry={retryFeed} />
              ) : isEmpty ? (
                <EmptyState
                  onViewMatches={() => setActiveTab("matches")}
                  onReset={handleResetDemo}
                  isResetting={isResetting}
                />
              ) : (
                <CardStack
                  ref={cardStackRef}
                  current={current}
                  next={next}
                  onSwipe={handleSwipeAction}
                  disabled={isSwiping}
                />
              )}
            </div>

            {!feedLoading && !feedError && !isEmpty && (
              <div className="w-full shrink-0 pt-1 pb-1">
                {swipeError && <p className="text-center text-xs font-bold text-coy-pink pb-1">{swipeError}</p>}
                <ActionButtons onSwipe={handleButtonSwipe} disabled={isSwiping} />
              </div>
            )}
          </div>
        ) : (
          <MatchesGrid matches={matches} loading={matchesLoading} />
        )}
      </div>

      <MatchOverlay
        matchedProfile={latestMatch}
        onKeepSwiping={clearMatch}
        onViewMatches={handleViewMatchesFromOverlay}
      />
    </div>
  );
}
