"use client";

import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  PanInfo,
} from "framer-motion";
import { ProfileCard } from "./ProfileCard";
import type { PublicProfile, SwipeAction } from "../types";
import {
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  SWIPE_ROTATION_FACTOR,
  SWIPE_FLY_OUT_X,
  ANIMATION_SPRING,
  NEXT_CARD_SCALE,
  NEXT_CARD_OFFSET_Y,
} from "../constants";

export interface CardStackRef {
  swipe: (action: SwipeAction) => Promise<void>;
}

interface CardStackProps {
  current: PublicProfile | null;
  next: PublicProfile | null;
  onSwipe: (action: SwipeAction) => void;
  disabled?: boolean;
}

export const CardStack = forwardRef<CardStackRef, CardStackProps>(
  function CardStack({ current, next, onSwipe, disabled = false }, ref) {
    const x = useMotionValue(0);
    const isAnimating = useRef(false);

    const rotate = useTransform(
      x,
      [-250, 250],
      [-SWIPE_ROTATION_FACTOR, SWIPE_ROTATION_FACTOR]
    );
    const likeOpacity = useTransform(x, [15, SWIPE_THRESHOLD], [0, 1]);
    const nopeOpacity = useTransform(x, [-15, -SWIPE_THRESHOLD], [0, 1]);

    const flyOutAndSwipe = useCallback(
      async (action: SwipeAction) => {
        if (isAnimating.current || !current || disabled) return;
        isAnimating.current = true;

        const targetX = action === "LIKE" ? SWIPE_FLY_OUT_X : -SWIPE_FLY_OUT_X;
        await animate(x, targetX, { duration: 0.22, ease: "easeOut" });

        onSwipe(action);
        x.set(0);
        isAnimating.current = false;
      },
      [current, disabled, onSwipe, x]
    );

    useImperativeHandle(ref, () => ({
      swipe: flyOutAndSwipe,
    }));

    useEffect(() => {
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") void flyOutAndSwipe("PASS");
        if (e.key === "ArrowRight") void flyOutAndSwipe("LIKE");
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [flyOutAndSwipe]);

    const handleDragEnd = useCallback(
      async (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (isAnimating.current || disabled) return;

        const passedDist = Math.abs(info.offset.x) >= SWIPE_THRESHOLD;
        const passedVel = Math.abs(info.velocity.x) >= SWIPE_VELOCITY_THRESHOLD;

        if (passedDist || passedVel) {
          const action: SwipeAction = info.offset.x > 0 ? "LIKE" : "PASS";
          await flyOutAndSwipe(action);
        } else {
          void animate(x, 0, ANIMATION_SPRING);
        }
      },
      [disabled, flyOutAndSwipe, x]
    );

    if (!current) return null;

    return (
      <div className="relative w-full h-[475px] sm:h-[490px] flex items-center justify-center">
        {/* Next card preview behind current */}
        {next && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: `scale(${NEXT_CARD_SCALE}) translateY(${NEXT_CARD_OFFSET_Y}px)`,
              zIndex: 0,
            }}
          >
            <ProfileCard profile={next} />
          </div>
        )}

        {/* Top interactive card */}
        <motion.div
          style={{ x, rotate, touchAction: "pan-y", zIndex: 10 }}
          drag={disabled ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.8}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        >
          <ProfileCard profile={current}>
            {/* LIKE Stamp */}
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-6 left-6 z-30 -rotate-12 border-[3px] border-black text-black bg-[#22C55E] px-3.5 py-1 rounded-xl text-2xl font-black tracking-wider uppercase shadow-brutal pointer-events-none"
            >
              CRUSH!
            </motion.div>

            {/* NOPE Stamp */}
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-6 right-6 z-30 rotate-12 border-[3px] border-black text-white bg-[#FF2D78] px-3.5 py-1 rounded-xl text-2xl font-black tracking-wider uppercase shadow-brutal pointer-events-none"
            >
              PASS
            </motion.div>
          </ProfileCard>
        </motion.div>
      </div>
    );
  }
);
