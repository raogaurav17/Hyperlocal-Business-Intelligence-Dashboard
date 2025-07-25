import { Router } from "express";
import { getCompietitorIntel } from './analysis.controller';

const router = Router();

router.post("/competitor-intel", getCompietitorIntel);

export default router;
