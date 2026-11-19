import { prisma } from "../lib/prisma";
import { resetCurrentUserCache } from "../modules/profiles/currentUser.helper";
import type { User } from "../../generated/prisma";

let userCounter = 1;

export async function cleanTestDatabase(): Promise<void> {
  await prisma.$transaction([
    prisma.swipe.deleteMany(),
    prisma.match.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  resetCurrentUserCache();
  userCounter = 1;
}

export async function createCurrentUser(): Promise<User> {
  return prisma.user.create({
    data: {
      id: "current_user_test",
      name: "Current Test User",
      age: 23,
      photoUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
      bio: "Test account bio",
      city: "Test City",
      interests: ["Coffee", "Coding"],
      isCurrentUser: true,
    },
  });
}

export async function createTestUser(
  overrides: Partial<Parameters<typeof prisma.user.create>[0]["data"]> = {}
): Promise<User> {
  const index = userCounter++;
  return prisma.user.create({
    data: {
      id: `test_profile_${index}`,
      name: `Candidate ${index}`,
      age: 20 + (index % 8),
      photoUrl: `https://randomuser.me/api/portraits/women/${index}.jpg`,
      bio: `Bio for candidate ${index}`,
      city: "Campus University",
      interests: ["Music", "Reading"],
      isCurrentUser: false,
      ...overrides,
    },
  });
}

export async function createInboundLike(
  fromUserId: string,
  toUserId: string
): Promise<void> {
  await prisma.swipe.create({
    data: {
      fromUserId,
      toUserId,
      action: "LIKE",
    },
  });
}
