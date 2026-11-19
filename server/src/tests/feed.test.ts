import { describe, it, expect, beforeEach, afterAll } from "vitest";
import request from "supertest";
import { app } from "../app";
import { prisma } from "../lib/prisma";
import {
  cleanTestDatabase,
  createCurrentUser,
  createTestUser,
  createInboundLike,
} from "./factories";

const EXPECTED_PUBLIC_KEYS = [
  "id",
  "name",
  "age",
  "photoUrl",
  "bio",
  "city",
  "interests",
].sort();

describe("Feed API - Privacy & Exclusion", () => {
  beforeEach(async () => {
    await cleanTestDatabase();
  });

  afterAll(async () => {
    await cleanTestDatabase();
    await prisma.$disconnect();
  });

  it("excludes the current user and already-swiped profiles from feed", async () => {
    const current = await createCurrentUser();
    const u1 = await createTestUser();
    const u2 = await createTestUser();
    const u3 = await createTestUser();

    // Current user swipes on u1
    await request(app)
      .post("/swipe")
      .send({ profileId: u1.id, action: "LIKE" });

    const res = await request(app).get("/feed");
    expect(res.status).toBe(200);

    const ids = res.body.profiles.map((p: { id: string }) => p.id);
    expect(ids).not.toContain(current.id);
    expect(ids).not.toContain(u1.id);
    expect(ids).toContain(u2.id);
    expect(ids).toContain(u3.id);
  });

  it("contains exactly the public fields and no extra keys", async () => {
    await createCurrentUser();
    await createTestUser();

    const res = await request(app).get("/feed");
    expect(res.status).toBe(200);
    expect(res.body.profiles.length).toBeGreaterThan(0);

    const profile = res.body.profiles[0];
    const actualKeys = Object.keys(profile).sort();
    expect(actualKeys).toEqual(EXPECTED_PUBLIC_KEYS);
  });

  it("never exposes information about unmatched inbound likes", async () => {
    const current = await createCurrentUser();
    const secretLiker = await createTestUser({ name: "Secret Liker" });
    await createTestUser({ name: "Normal User" });

    // secretLiker likes current user behind the scenes
    await createInboundLike(secretLiker.id, current.id);

    const res = await request(app).get("/feed");
    expect(res.status).toBe(200);

    const rawJson = JSON.stringify(res.body);
    expect(rawJson).not.toContain("likesCurrentUser");
    expect(rawJson).not.toContain("hasLiked");
    expect(rawJson).not.toContain("inbound");

    for (const p of res.body.profiles) {
      expect(p).not.toHaveProperty("hasLiked");
      expect(p).not.toHaveProperty("likesMe");
      expect(p).not.toHaveProperty("isLiked");
    }
  });
});
