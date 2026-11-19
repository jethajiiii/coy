export const INTERESTS = [
  "Filter Coffee",
  "Indie Rock",
  "Film Photography",
  "Bouldering",
  "Chai & Samosas",
  "Badminton",
  "Street Food",
  "Stand-up Comedy",
  "Reading Fiction",
  "Classical Music",
  "Hiking",
  "Board Games",
  "Baking",
  "Pottery",
  "Yoga",
  "Poetry",
  "Astrophotography",
  "Cricket",
  "Anime",
  "Thrifting",
] as const;

export type Interest = (typeof INTERESTS)[number];

export interface SeedProfile {
  name: string;
  age: number;
  photoUrl: string;
  bio: string;
  city: string;
  interests: Interest[];
  likesCurrentUser: boolean;
}
