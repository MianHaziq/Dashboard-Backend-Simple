import { Router } from "express";
import { getUserStats } from "../controllers/statController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getUserStats);

export default router;