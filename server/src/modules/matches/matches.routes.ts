import { Router } from "express";
import { handleGetMatches } from "./matches.controller";

const router = Router();

router.get("/", handleGetMatches);

export { router as matchesRouter };
