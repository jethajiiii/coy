import { Router } from "express";
import { handlePostSwipe } from "./swipes.controller";
import { validate } from "../../middleware/validate";
import { swipeSchema } from "./swipes.schema";

const router = Router();

router.post("/", validate(swipeSchema, "body"), handlePostSwipe);

export { router as swipesRouter };
