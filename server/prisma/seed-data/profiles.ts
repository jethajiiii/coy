import { batch1 } from "./batch1";
import { batch2 } from "./batch2";
import { batch3 } from "./batch3";
import type { SeedProfile } from "./types";

export { INTERESTS, type Interest, type SeedProfile } from "./types";

export const seedProfiles: SeedProfile[] = [
  ...batch1,
  ...batch2,
  ...batch3,
];
