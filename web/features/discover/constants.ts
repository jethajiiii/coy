export const SWIPE_THRESHOLD = 90;
export const SWIPE_VELOCITY_THRESHOLD = 500;
export const SWIPE_ROTATION_FACTOR = 14;
export const SWIPE_FLY_OUT_X = 600;

export const ANIMATION_SPRING = {
  type: "spring",
  stiffness: 450,
  damping: 30,
} as const;

export const NEXT_CARD_SCALE = 0.94;
export const NEXT_CARD_OFFSET_Y = 12;

export const TABS = [
  { href: "/home", label: "Home" },
  { href: "/discover", label: "Discover" },
] as const;
