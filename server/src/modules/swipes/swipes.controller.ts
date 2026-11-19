import type { Request, Response, NextFunction } from "express";
import { processSwipe } from "./swipes.service";
import { HTTP } from "../../config/constants";
import type { SwipeInput } from "./swipes.schema";

export async function handlePostSwipe(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const input = req.body as SwipeInput;
    const result = await processSwipe(input);
    res.status(HTTP.OK).json(result);
  } catch (error) {
    next(error);
  }
}
