import type { Request, Response, NextFunction } from "express";
import { getFeed } from "./feed.service";
import { HTTP } from "../../config/constants";

export async function handleGetFeed(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const profiles = await getFeed();
    res.status(HTTP.OK).json({ profiles });
  } catch (error) {
    next(error);
  }
}
