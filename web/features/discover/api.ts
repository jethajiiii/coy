import { apiClient } from "@/lib/api-client";
import type {
  FeedResponse,
  MatchesResponse,
  SwipeAction,
  SwipeResponse,
} from "./types";

export async function getFeed(): Promise<FeedResponse> {
  return apiClient<FeedResponse>("/feed");
}

export async function postSwipe(
  profileId: string,
  action: SwipeAction
): Promise<SwipeResponse> {
  return apiClient<SwipeResponse>("/swipe", {
    method: "POST",
    body: { profileId, action },
  });
}

export async function getMatches(): Promise<MatchesResponse> {
  return apiClient<MatchesResponse>("/matches");
}
