import { Router } from "express";
import { getUserArticles } from "../controllers/articleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, getUserArticles);

export default router;
