import { Router } from "express";
import { getUserStreakCount } from "../controllers/streakController";
import { authMiddleware } from "../middlewares/authMiddleware"; 

const router = Router();

router.get("/", authMiddleware, getUserStreakCount);

export default router;
