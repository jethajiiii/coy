import { z } from "zod";

export const swipeSchema = z.object({
  profileId: z.string().min(1, "profileId is required"),
  action: z.enum(["LIKE", "PASS"]),
});

export type SwipeInput = z.infer<typeof swipeSchema>;

export interface SwipeResponse {
  matched: boolean;
  profile?: import("../profiles/profile.mapper").PublicProfile;
}
