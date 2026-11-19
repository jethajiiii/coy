import { findUnswipedProfiles } from "./feed.repository";
import { getCurrentUserId } from "../profiles/currentUser.helper";
import {
  toPublicProfile,
  PublicProfile,
} from "../profiles/profile.mapper";

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

export async function getFeed(): Promise<PublicProfile[]> {
  const currentUserId = await getCurrentUserId();
  const profiles = await findUnswipedProfiles(currentUserId);
  const shuffled = shuffleArray(profiles);
  return shuffled.map(toPublicProfile);
}
