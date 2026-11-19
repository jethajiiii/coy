import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/AppError";
import { HTTP } from "../../config/constants";

let cachedCurrentUserId: string | null = null;

export async function getCurrentUserId(): Promise<string> {
  if (cachedCurrentUserId) {
    return cachedCurrentUserId;
  }

  const user = await prisma.user.findFirst({
    where: { isCurrentUser: true },
    select: { id: true },
  });

  if (!user) {
    throw new AppError(
      "Current user is not initialized. Please run database seed.",
      HTTP.INTERNAL
    );
  }

  cachedCurrentUserId = user.id;
  return user.id;
}

export function resetCurrentUserCache(): void {
  cachedCurrentUserId = null;
}
