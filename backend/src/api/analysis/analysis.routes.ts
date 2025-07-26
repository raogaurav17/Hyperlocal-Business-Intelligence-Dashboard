import { Router } from "express";
import { getCompetitorIntel } from './analysis.controller';

const router = Router();

router.post("/competitor-intel", getCompetitorIntel);

// General analysis endpoint
router.post("/", getCompetitorIntel); // This will handle POST /api/analysis

export default router;
