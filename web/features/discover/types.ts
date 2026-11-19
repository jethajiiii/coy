export type SwipeAction = "LIKE" | "PASS";

export interface PublicProfile {
  id: string;
  name: string;
  age: number;
  photoUrl: string;
  bio: string;
  city: string;
  interests: string[];
}

export interface MatchedProfile extends PublicProfile {
  matchedAt: string;
}

export interface SwipeResponse {
  matched: boolean;
  profile?: PublicProfile;
}

export interface FeedResponse {
  profiles: PublicProfile[];
}

export interface MatchesResponse {
  matches: MatchedProfile[];
}
