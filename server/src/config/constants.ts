export const CURRENT_USER_ID = "current_user";

export const HTTP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL: 500,
  UNAVAILABLE: 503,
} as const;

export const FEED_LIMIT = 20;

export const CORS_ORIGIN = process.env["CORS_ORIGIN"] || "*";
