import { findMatchesForUser } from "./matches.repository";
import { getCurrentUserId } from "../profiles/currentUser.helper";
import {
  toPublicProfile,
  MatchedProfile,
} from "../profiles/profile.mapper";

export async function getMatches(): Promise<MatchedProfile[]> {
  const currentUserId = await getCurrentUserId();
  const records = await findMatchesForUser(currentUserId);

  return records.map((record) => ({
    ...toPublicProfile(record.partner),
    matchedAt: record.matchedAt.toISOString(),
  }));
}
