import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { HTTP } from "../config/constants";

interface ErrorResponse {
  error: string;
}

function isDbError(err: unknown): boolean {
  if (typeof err !== "object" || err === null) return false;
  const msg = (err as Record<string, unknown>)["message"];
  return (
    typeof msg === "string" &&
    (msg.includes("ECONNREFUSED") ||
      msg.includes("ENOTFOUND") ||
      msg.includes("Can't reach database") ||
      msg.includes("waking up"))
  );
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ErrorResponse>,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (isDbError(err)) {
    res.status(HTTP.UNAVAILABLE).json({
      error: "Database is waking up — please try again in a moment.",
    });
    return;
  }

  const isProd = process.env["NODE_ENV"] === "production";
  console.error("[error]", err);
  res.status(HTTP.INTERNAL).json({
    error: isProd ? "Something went wrong." : String(err),
  });
}
