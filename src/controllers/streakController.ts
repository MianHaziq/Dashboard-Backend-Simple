import { Request, Response } from "express";
import { Streak } from "../models/streakModel";
import { v4 as uuidv4 } from "uuid";

const isValidUUID = (id: string): boolean => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
};

export const getUserStreakCount = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    if (!userId || !isValidUUID(userId)) {
      return res.status(401).json({ message: "Unauthorized: Invalid user ID" });
    }

    const streak = await Streak.findOne({ where: { userId }, order: [["createdAt", "DESC"]] });

    if (!streak) {
      const randomCount = Math.floor(Math.random() * 10) + 1;
      const newStreak = await Streak.create({
        id: uuidv4(),
        userId,
        count: randomCount,
      });

      return res.status(200).json({ count: newStreak.count });
    }

    return res.status(200).json({ count: streak.count });
  } catch (err) {
    console.error("getUserStreakCount error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
