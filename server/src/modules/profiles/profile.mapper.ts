export const PUBLIC_PROFILE_SELECT = {
  id: true,
  name: true,
  age: true,
  photoUrl: true,
  bio: true,
  city: true,
  interests: true,
} as const;

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

/**
 * The ONLY place that decides which fields are exposed to clients.
 * Never exposes inbound likes, timestamps, internal flags, or IDs.
 */
export function toPublicProfile(raw: PublicProfile): PublicProfile {
  return {
    id: raw.id,
    name: raw.name,
    age: raw.age,
    photoUrl: raw.photoUrl,
    bio: raw.bio,
    city: raw.city,
    interests: raw.interests,
  };
}
