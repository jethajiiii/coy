import express from "express";
import cors from "cors";
import { CORS_ORIGIN, HTTP } from "./config/constants";
import { checkDatabaseConnection } from "./lib/prisma";
import { errorHandler } from "./middleware/errorHandler";
import { feedRouter } from "./modules/feed/feed.routes";
import { swipesRouter } from "./modules/swipes/swipes.routes";
import { matchesRouter } from "./modules/matches/matches.routes";
import { devRouter } from "./modules/dev/dev.routes";

const app = express();

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/health", async (_req, res, next) => {
  try {
    await checkDatabaseConnection();
    res.status(HTTP.OK).json({ status: "ok" });
  } catch (err) {
    next(err);
  }
});

app.use("/feed", feedRouter);
app.use("/swipe", swipesRouter);
app.use("/matches", matchesRouter);
app.use("/dev", devRouter);

app.use(errorHandler);

export { app };
