import { Request, Response } from "express";
import { Article } from "../models/articleModel";

export const getUserArticles = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let existing = await Article.findAll({ where: { userId } });

    if (existing.length === 0) {
      const defaultArticles = [
        {
          channel: "Al Jazeera",
          url: "#",
          cimage: "/jazeera.png",
          time: "• 7 min read",
          category: "🏛️ Politics",
          catImage: "",
          level: "ILR Level: 2-Moderate",
          levImage: "",
          title: "جدعون ليفي: إسرائيل ليست أسدا صاعدا وإنما هي أسد مريض",
          content:
            "يرى ليفي أن مصير الحرب مرهون بنزوات رئيس أميركي “متقلب المزاج” و “ثرثار”، فإذا قرر أن يقصف إيران فقد يتحقق انتصار...",
          progress: 0,
          userId,
        },
        {
          channel: "Al Jazeera",
          url: "#",
          cimage: "/jazeera.png",
          time: "• 7 min read",
          category: "🏛️ Politics",
          catImage: "",
          level: "ILR Level: 2-Moderate",
          levImage: "",
          title: "جدعون ليفي: إسرائيل ليست أسدا صاعدا وإنما هي أسد مريض",
          content:
            "يرى ليفي أن مصير الحرب مرهون بنزوات رئيس أميركي “متقلب المزاج” و “ثرثار”، فإذا قرر أن يقصف إيران فقد يتحقق انتصار...",
          progress: 47,
          userId,
        },
      ];

      await Article.bulkCreate(defaultArticles);
      existing = await Article.findAll({ where: { userId } });
    }

    return res.status(200).json(existing);
  } catch (error) {
    console.error("getUserArticles error:", error);
    return res.status(500).json({
      message: "Server error while fetching articles",
      error: (error as any).message,
    });
  }
};
