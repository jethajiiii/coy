import type { Request, Response, NextFunction } from "express";
import { getMatches } from "./matches.service";
import { HTTP } from "../../config/constants";

export async function handleGetMatches(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const matches = await getMatches();
    res.status(HTTP.OK).json({ matches });
  } catch (error) {
    next(error);
  }
}
