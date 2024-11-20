import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getEstimate } from "../controllers/getEstimate";

const router = Router();

router.post("/estimate", asyncHandler(getEstimate));

export default router;
