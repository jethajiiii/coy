import { Router, Request, Response, NextFunction } from "express";
import { resetCurrentUserCache } from "../profiles/currentUser.helper";
import { HTTP } from "../../config/constants";
import { AppError } from "../../errors/AppError";

const router = Router();

router.post(
  "/reset",
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (process.env["ALLOW_DEV_RESET"] !== "true" && process.env["NODE_ENV"] === "production") {
        throw new AppError("Forbidden in production.", HTTP.BAD_REQUEST);
      }

      const { seedDatabase } = await import("../../../prisma/seed");
      const summary = await seedDatabase(true);
      resetCurrentUserCache();

      res.status(HTTP.OK).json({
        success: true,
        message: "Database reset and seeded successfully.",
        summary,
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router as devRouter };
