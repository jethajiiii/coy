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
import { MessageCircle } from "lucide-react";

function MysteryBanner(): React.JSX.Element {
  return (
    <div
      className="mx-4 mb-2 bg-white border-[2px] border-black rounded-2xl px-3 py-2 flex items-center gap-2.5 shrink-0"
      style={{ boxShadow: "2px 2px 0px #000" }}
    >
      <div
        className="w-7 h-7 rounded-full bg-coy-yellow border-[2px] border-black flex items-center justify-center shrink-0"
        style={{ boxShadow: "1px 1px 0px #000" }}
      >
        <MessageCircle size={14} strokeWidth={2.8} className="text-black" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] font-black uppercase tracking-tight text-black">
            A MESSAGE FROM COY
          </span>
          <span className="text-[9px] font-semibold text-neutral-400 shrink-0">now</span>
        </div>
        <p className="text-[10px] leading-tight text-neutral-600 font-medium truncate">
          Someone with your number added you as their secret crush...
        </p>
      </div>
    </div>
  );
}

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

  const showBanner = !feedLoading && !feedError && !isEmpty && activeTab === "discover";

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAF8F5] relative overflow-hidden">
      <DiscoverHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        matchesCount={matchesCount}
      />

      {/* Mystery banner */}
      {showBanner && <MysteryBanner />}

      <div
        className={`flex-1 flex flex-col px-4 pb-1 relative ${
          activeTab === "discover" ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        {activeTab === "discover" ? (
          <div className="flex-1 flex flex-col justify-between items-center w-full h-full overflow-hidden">
            <div className="w-full flex-1 flex items-center justify-center relative min-h-0">
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

            {/* Action Controls */}
            {!feedLoading && !feedError && !isEmpty && (
              <div className="w-full shrink-0 pt-1 pb-1">
                {swipeError && (
                  <p className="text-center text-xs font-bold text-coy-pink pb-1">
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

      {/* Mutual Match Modal */}
      <MatchOverlay
        matchedProfile={latestMatch}
        onKeepSwiping={clearMatch}
        onViewMatches={handleViewMatchesFromOverlay}
      />
    </div>
  );
}
