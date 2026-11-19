import type { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { HTTP } from "../config/constants";

type Target = "body" | "params" | "query";

export function validate(schema: ZodSchema, target: Target = "body") {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => i.message)
        .join("; ");
      res.status(HTTP.BAD_REQUEST).json({ error: issues });
      return;
    }
    // Safe: req[target] accepts unknown assignment at runtime
    Object.assign(req, { [target]: result.data });
    next();
  };
}
