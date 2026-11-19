import { prisma } from "../../lib/prisma";
import {
  PUBLIC_PROFILE_SELECT,
  PublicProfile,
} from "../profiles/profile.mapper";

export async function findProfileById(
  id: string
): Promise<PublicProfile | null> {
  return prisma.user.findUnique({
    where: { id },
    select: PUBLIC_PROFILE_SELECT,
  });
}

function getSortedIds(idA: string, idB: string): [string, string] {
  return idA < idB ? [idA, idB] : [idB, idA];
}

async function handleExistingSwipe(
  tx: Parameters<Parameters<typeof prisma.$transaction>[0]>[0],
  userAId: string,
  userBId: string
): Promise<boolean> {
  const match = await tx.match.findUnique({
    where: { userAId_userBId: { userAId, userBId } },
  });
  return match !== null;
}

export async function executeSwipe(
  currentUserId: string,
  targetUserId: string,
  action: "LIKE" | "PASS"
): Promise<boolean> {
  const [userAId, userBId] = getSortedIds(currentUserId, targetUserId);

  return prisma.$transaction(async (tx) => {
    const existing = await tx.swipe.findUnique({
      where: {
        fromUserId_toUserId: {
          fromUserId: currentUserId,
          toUserId: targetUserId,
        },
      },
    });

    if (existing) {
      return handleExistingSwipe(tx, userAId, userBId);
    }

    try {
      await tx.swipe.create({
        data: { fromUserId: currentUserId, toUserId: targetUserId, action },
      });
    } catch (err: unknown) {
      if ((err as { code?: string })?.code !== "P2002") throw err;
      return handleExistingSwipe(tx, userAId, userBId);
    }

    if (action !== "LIKE") return false;

    const inbound = await tx.swipe.findFirst({
      where: {
        fromUserId: targetUserId,
        toUserId: currentUserId,
        action: "LIKE",
      },
    });

    if (!inbound) return false;

    try {
      await tx.match.create({ data: { userAId, userBId } });
    } catch (err: unknown) {
      if ((err as { code?: string })?.code !== "P2002") throw err;
    }

    return true;
  },
  { maxWait: 10000, timeout: 25000 });
}
