import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getRide } from "../controllers/getRide";
import { getEstimate } from "../controllers/getEstimate";
import { rideConfirm } from "../controllers/rideConfirm";

const router = Router();

router.get('/:id', asyncHandler(getRide));
router.post("/estimate", asyncHandler(getEstimate));
router.patch("/confirm", asyncHandler(rideConfirm));

export default router;
