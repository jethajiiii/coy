import { Router } from "express";
import { handleGetFeed } from "./feed.controller";

const router = Router();

router.get("/", handleGetFeed);

export { router as feedRouter };
