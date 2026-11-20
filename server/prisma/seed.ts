import { config } from "dotenv";
config();

import { PrismaClient } from "@prisma/client";
import { seedProfiles } from "./seed-data/profiles";
import { CURRENT_USER_ID } from "../src/config/constants";

const prisma = new PrismaClient();

export function guardSeedEnvironment(allowForce = false): void {
  const nodeEnv = process.env["NODE_ENV"] ?? "development";
  if (!allowForce && process.env["ALLOW_DEV_RESET"] !== "true" && nodeEnv === "production") {
    throw new Error("Seed refused: Cannot run seed script in production.");
  }
  const dbUrl = process.env["DATABASE_URL"] ?? "";
  const testUrl = process.env["DATABASE_URL_TEST"] ?? "";
  if (testUrl && dbUrl === testUrl) {
    throw new Error("Seed refused: DATABASE_URL matches DATABASE_URL_TEST.");
  }
}

export interface SeedSummary {
  usersCreated: number;
  inboundLikesCreated: number;
}

export async function seedDatabase(allowForce = false): Promise<SeedSummary> {
  guardSeedEnvironment(allowForce);

  return prisma.$transaction(
    async (tx) => {
      // Clean wipe in reverse dependency order
      await tx.swipe.deleteMany();
      await tx.match.deleteMany();
      await tx.user.deleteMany();

      const userRecords = [
        {
          id: CURRENT_USER_ID,
          name: "Alex (You)",
          age: 23,
          photoUrl: "https://randomuser.me/api/portraits/lego/1.jpg",
          bio: "Exploring Coy Discover. Privacy-first, always.",
          city: "Bangalore, KA",
          interests: ["Filter Coffee", "Indie Rock", "Film Photography"],
          isCurrentUser: true,
        },
        ...seedProfiles.map((p, i) => ({
          id: `profile_${String(i + 1).padStart(2, "0")}`,
          name: p.name,
          age: p.age,
          photoUrl: p.photoUrl,
          bio: p.bio,
          city: p.city,
          interests: [...p.interests],
          isCurrentUser: false,
        })),
      ];

      await tx.user.createMany({ data: userRecords });

      const inboundLikes = seedProfiles
        .map((p, i) => ({
          likesCurrentUser: p.likesCurrentUser,
          fromUserId: `profile_${String(i + 1).padStart(2, "0")}`,
        }))
        .filter((p) => p.likesCurrentUser)
        .map((p) => ({
          fromUserId: p.fromUserId,
          toUserId: CURRENT_USER_ID,
          action: "LIKE" as const,
        }));

      await tx.swipe.createMany({ data: inboundLikes });

      return {
        usersCreated: userRecords.length,
        inboundLikesCreated: inboundLikes.length,
      };
    },
    { maxWait: 10000, timeout: 30000 }
  );
}

async function run(): Promise<void> {
  try {
    const summary = await seedDatabase();
    console.log(
      `✅ Seed completed successfully: ${summary.usersCreated} users created (1 current user + ${seedProfiles.length} profiles), ${summary.inboundLikesCreated} inbound likes created.`
    );
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

if (process.argv[1]?.includes("seed")) {
  void run();
}
