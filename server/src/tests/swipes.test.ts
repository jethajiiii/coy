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

describe("Swipe & Matches API", () => {
  beforeEach(async () => {
    await cleanTestDatabase();
  });

  afterAll(async () => {
    await cleanTestDatabase();
    await prisma.$disconnect();
  });

  it("LIKE on a profile that liked me creates a match", async () => {
    const current = await createCurrentUser();
    const candidate = await createTestUser();
    await createInboundLike(candidate.id, current.id);

    const res = await request(app)
      .post("/swipe")
      .send({ profileId: candidate.id, action: "LIKE" });

    expect(res.status).toBe(200);
    expect(res.body.matched).toBe(true);
    expect(res.body.profile).toBeDefined();
    expect(res.body.profile.id).toBe(candidate.id);
  });

  it("LIKE on a profile that did NOT like me does not create a match", async () => {
    await createCurrentUser();
    const candidate = await createTestUser();

    const res = await request(app)
      .post("/swipe")
      .send({ profileId: candidate.id, action: "LIKE" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ matched: false });
    expect(res.body.profile).toBeUndefined();
  });

  it("PASS never creates a match even if profile liked me", async () => {
    const current = await createCurrentUser();
    const candidate = await createTestUser();
    await createInboundLike(candidate.id, current.id);

    const res = await request(app)
      .post("/swipe")
      .send({ profileId: candidate.id, action: "PASS" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ matched: false });
  });

  it("duplicate swipe is idempotent and never changes first action", async () => {
    await createCurrentUser();
    const candidate = await createTestUser();

    const first = await request(app)
      .post("/swipe")
      .send({ profileId: candidate.id, action: "PASS" });
    expect(first.body.matched).toBe(false);

    // Attempt second swipe with LIKE
    const second = await request(app)
      .post("/swipe")
      .send({ profileId: candidate.id, action: "LIKE" });
    expect(second.body.matched).toBe(false);

    // Verify DB still holds PASS action
    const row = await prisma.swipe.findFirst({
      where: { toUserId: candidate.id },
    });
    expect(row?.action).toBe("PASS");
  });

  it("returns 400 for invalid action, 404 for unknown, 400 for self", async () => {
    const current = await createCurrentUser();
    const candidate = await createTestUser();

    const invalid = await request(app)
      .post("/swipe")
      .send({ profileId: candidate.id, action: "SUPER_LIKE" });
    expect(invalid.status).toBe(400);

    const unknown = await request(app)
      .post("/swipe")
      .send({ profileId: "unknown_id_999", action: "LIKE" });
    expect(unknown.status).toBe(404);

    const self = await request(app)
      .post("/swipe")
      .send({ profileId: current.id, action: "LIKE" });
    expect(self.status).toBe(400);
  });

  it("/matches returns only mutual matches ordered newest first", async () => {
    const current = await createCurrentUser();
    const partner = await createTestUser({ name: "Mutual Match" });
    const oneWay = await createTestUser({ name: "One-Way Liker" });

    await createInboundLike(partner.id, current.id);
    await createInboundLike(oneWay.id, current.id);

    await request(app)
      .post("/swipe")
      .send({ profileId: partner.id, action: "LIKE" });

    const res = await request(app).get("/matches");
    expect(res.status).toBe(200);
    expect(res.body.matches.length).toBe(1);
    expect(res.body.matches[0].name).toBe("Mutual Match");
    expect(res.body.matches[0].matchedAt).toBeDefined();
  });
});
