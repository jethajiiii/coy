import { findProfileById, executeSwipe } from "./swipes.repository";
import { getCurrentUserId } from "../profiles/currentUser.helper";
import { toPublicProfile } from "../profiles/profile.mapper";
import { AppError } from "../../errors/AppError";
import { HTTP } from "../../config/constants";
import type { SwipeInput, SwipeResponse } from "./swipes.schema";

export async function processSwipe(input: SwipeInput): Promise<SwipeResponse> {
  const currentUserId = await getCurrentUserId();

  if (input.profileId === currentUserId) {
    throw new AppError("Cannot swipe on yourself.", HTTP.BAD_REQUEST);
  }

  const targetProfile = await findProfileById(input.profileId);
  if (!targetProfile) {
    throw new AppError("Profile not found.", HTTP.NOT_FOUND);
  }

  const matched = await executeSwipe(
    currentUserId,
    input.profileId,
    input.action
  );

  if (matched) {
    return {
      matched: true,
      profile: toPublicProfile(targetProfile),
    };
  }

  return { matched: false };
}
