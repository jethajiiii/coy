"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  useFeed,
  useSwipe,
  useMatches,
} from "@/features/discover/hooks";
import {
  DiscoverHeader,
  CardStack,
  CardStackRef,
  ActionButtons,
  MatchOverlay,
  MatchesGrid,
  EmptyState,
  SkeletonCard,
  ErrorState,
} from "@/features/discover/components";
import type { SwipeAction } from "@/features/discover/types";

export default function DiscoverPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<"discover" | "matches">("discover");
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
      if (isMatched) {
        void refetchMatches();
      }
    },
    [swipe, refetchMatches]
  );

  const handleButtonSwipe = useCallback((action: SwipeAction) => {
    if (cardStackRef.current) {
      void cardStackRef.current.swipe(action);
    }
  }, []);

  const handleViewMatchesFromOverlay = useCallback(() => {
    clearMatch();
    setActiveTab("matches");
    void refetchMatches();
  }, [clearMatch, refetchMatches]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      <DiscoverHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matchesCount={matchesCount}
      />

      <div className="flex-1 flex flex-col p-4 relative overflow-y-auto">
        {activeTab === "discover" ? (
          <div className="flex-1 flex flex-col justify-between items-center max-w-sm mx-auto w-full">
            <div className="w-full flex-1 flex items-center justify-center relative">
              {feedLoading ? (
                <SkeletonCard />
              ) : feedError ? (
                <ErrorState message={feedError} onRetry={retryFeed} />
              ) : isEmpty ? (
                <EmptyState onViewMatches={() => setActiveTab("matches")} />
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

            {/* Floating Action Controls */}
            {!feedLoading && !feedError && !isEmpty && (
              <div className="w-full shrink-0">
                {swipeError && (
                  <p className="text-center text-xs text-rose-500 font-medium pb-1">
                    {swipeError}
                  </p>
                )}
                <ActionButtons
                  onSwipe={handleButtonSwipe}
                  disabled={isSwiping}
                />
              </div>
            )}
          </div>
        ) : (
          <MatchesGrid matches={matches} loading={matchesLoading} />
        )}
      </div>

      {/* Mutual Match Modal Overlay */}
      <MatchOverlay
        matchedProfile={latestMatch}
        onKeepSwiping={clearMatch}
        onViewMatches={handleViewMatchesFromOverlay}
      />
    </div>
  );
}
