import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getEstimate } from "../controllers/getEstimate";
import { rideConfirm } from "../controllers/rideConfirm";

const router = Router();

router.post("/estimate", asyncHandler(getEstimate));
router.patch("/confirm", asyncHandler(rideConfirm));

export default router;
