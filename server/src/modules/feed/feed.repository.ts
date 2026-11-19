import { prisma } from "../../lib/prisma";
import {
  PUBLIC_PROFILE_SELECT,
  PublicProfile,
} from "../profiles/profile.mapper";

export async function findUnswipedProfiles(
  currentUserId: string
): Promise<PublicProfile[]> {
  return prisma.user.findMany({
    where: {
      id: { not: currentUserId },
      swipesReceived: {
        none: { fromUserId: currentUserId },
      },
    },
    select: PUBLIC_PROFILE_SELECT,
  });
}
