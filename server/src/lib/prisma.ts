import { PrismaClient } from "@generated/prisma";

let client: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (!client) {
    client = new PrismaClient({
      log:
        process.env["NODE_ENV"] === "development"
          ? ["error", "warn"]
          : ["error"],
    });
  }
  return client;
}

export const prisma = getPrisma();

export async function checkDatabaseConnection(): Promise<void> {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    throw new Error(
      "Database is waking up or unreachable — please try again in a moment."
    );
  }
}
