import { prisma } from "../../lib/prisma";
import {
  PUBLIC_PROFILE_SELECT,
  PublicProfile,
} from "../profiles/profile.mapper";

export interface RawMatchRecord {
  matchedAt: Date;
  partner: PublicProfile;
}

export async function findMatchesForUser(
  currentUserId: string
): Promise<RawMatchRecord[]> {
  const records = await prisma.match.findMany({
    where: {
      OR: [{ userAId: currentUserId }, { userBId: currentUserId }],
    },
    orderBy: { createdAt: "desc" },
    select: {
      createdAt: true,
      userAId: true,
      userA: { select: PUBLIC_PROFILE_SELECT },
      userB: { select: PUBLIC_PROFILE_SELECT },
    },
  });

  return records.map((record) => ({
    matchedAt: record.createdAt,
    partner:
      record.userAId === currentUserId ? record.userB : record.userA,
  }));
}
