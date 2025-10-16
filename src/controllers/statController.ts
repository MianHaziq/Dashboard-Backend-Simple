import { Request, Response } from "express";
import { Stat } from "../models/statModel";

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const defaultStats = [
      {
        title: "Article Completed",
        total: 233,
        image: "/article.png",
        userId,
      },
      {
        title: "Vocabulary Learned",
        total: 12344,
        image: "/dictionary.png",
        userId,
      },
      {
        title: "Speaking Activities",
        total: 678,
        image: "/speaking.png",
        userId,
      },
    ];

    const existingStats = await Stat.findAll({ where: { userId } });

    if (existingStats.length === 0) {
      await Stat.bulkCreate(defaultStats);
    }

    const userStats = await Stat.findAll({ where: { userId } });

    return res.json(userStats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching stats" });
  }
};
