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
import { LikeStamp, NopeStamp } from "./SwipeStamps";
import type { PublicProfile, SwipeAction } from "../types";
import {
  SWIPE_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
  SWIPE_FLY_OUT_X,
  ANIMATION_SPRING,
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
    const y = useMotionValue(0);
    const isAnimating = useRef(false);

    // Dynamic tilt & natural hand swipe arc
    const rotate = useTransform(x, [-260, 0, 260], [-22, 0, 22]);
    const naturalY = useTransform(x, [-260, 0, 260], [12, 0, 12]);

    // Stamp animations
    const likeOpacity = useTransform(x, [15, SWIPE_THRESHOLD], [0, 1]);
    const likeScale = useTransform(x, [10, SWIPE_THRESHOLD, SWIPE_THRESHOLD * 2], [0.6, 1.1, 1.25]);
    const likeRotate = useTransform(x, [0, SWIPE_THRESHOLD], [-22, -12]);

    const nopeOpacity = useTransform(x, [-15, -SWIPE_THRESHOLD], [0, 1]);
    const nopeScale = useTransform(x, [-10, -SWIPE_THRESHOLD, -SWIPE_THRESHOLD * 2], [0.6, 1.1, 1.25]);
    const nopeRotate = useTransform(x, [0, -SWIPE_THRESHOLD], [22, 12]);

    // Back card 3D parallax reactive scale and lift
    const nextScale = useTransform(x, [-SWIPE_THRESHOLD * 2.5, 0, SWIPE_THRESHOLD * 2.5], [1.0, 0.93, 1.0]);
    const nextTranslateY = useTransform(x, [-SWIPE_THRESHOLD * 2.5, 0, SWIPE_THRESHOLD * 2.5], [0, 14, 0]);
    const nextOpacity = useTransform(x, [-SWIPE_THRESHOLD * 2.5, 0, SWIPE_THRESHOLD * 2.5], [1.0, 0.72, 1.0]);

    const flyOutAndSwipe = useCallback(
      async (action: SwipeAction) => {
        if (isAnimating.current || !current || disabled) return;
        isAnimating.current = true;

        const targetX = action === "LIKE" ? SWIPE_FLY_OUT_X + 150 : -(SWIPE_FLY_OUT_X + 150);
        await Promise.all([
          animate(x, targetX, { duration: 0.26, ease: [0.32, 0.72, 0, 1] }),
          animate(y, -35, { duration: 0.26, ease: "easeOut" }),
        ]);

        onSwipe(action);
        x.set(0);
        y.set(0);
        isAnimating.current = false;
      },
      [current, disabled, onSwipe, x, y]
    );

    useImperativeHandle(ref, () => ({ swipe: flyOutAndSwipe }));

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

        const passed = Math.abs(info.offset.x) >= SWIPE_THRESHOLD || Math.abs(info.velocity.x) >= SWIPE_VELOCITY_THRESHOLD;
        if (passed) {
          await flyOutAndSwipe(info.offset.x > 0 ? "LIKE" : "PASS");
        } else {
          void Promise.all([animate(x, 0, ANIMATION_SPRING), animate(y, 0, ANIMATION_SPRING)]);
        }
      },
      [disabled, flyOutAndSwipe, x, y]
    );

    if (!current) return null;

    return (
      <div className="relative w-full h-full max-h-[460px] flex items-center justify-center">
        {next && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ scale: nextScale, y: nextTranslateY, opacity: nextOpacity, zIndex: 0 }}
          >
            <ProfileCard profile={next} />
          </motion.div>
        )}

        <motion.div
          style={{ x, y: naturalY, rotate, touchAction: "pan-y", zIndex: 10 }}
          drag={disabled ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.82}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing will-change-transform"
        >
          <ProfileCard profile={current}>
            <LikeStamp opacity={likeOpacity} scale={likeScale} rotate={likeRotate} />
            <NopeStamp opacity={nopeOpacity} scale={nopeScale} rotate={nopeRotate} />
          </ProfileCard>
        </motion.div>
      </div>
    );
  }
);
