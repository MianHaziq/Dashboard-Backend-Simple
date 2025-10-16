import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sequelize } from "./config/db";
import authRoutes from "./routes/authRoutes";
import { setupSwagger } from "./utils/swagger";
import cookieParser from "cookie-parser";
import streakRoutes from "./routes/streakRoutes";
import articleRoutes from "./routes/articleRoutes";

import statRoutes from "./routes/statRoutes";


const nodeEnv = process.env.NODE_ENV || "development";
const envFile = `.env.${nodeEnv}`;
dotenv.config({ path: envFile });

const app: Application = express();

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,               
}));

app.use(cookieParser());

app.use(express.json());

setupSwagger(app);

app.get("/", (req: Request, res: Response) => {
  res.send(`${nodeEnv.toUpperCase()} Environment — TypeScript + Express + Sequelize Backend`);
});

app.use("/api/auth", authRoutes);
app.use("/api/streaks", streakRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/articles", articleRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database connected successfully!");
    console.log(`Server running on http://localhost:${PORT} [${nodeEnv}]`);
      console.log(`Swagger Docs http://localhost:${PORT}/api-docs`);
  } catch (error) {
    console.error(" DB connection error:", error);
    process.exit(1);
  }
});
