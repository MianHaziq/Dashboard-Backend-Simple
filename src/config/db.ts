import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${nodeEnv}` });

if (!process.env.DATABASE_URL) {
  throw new Error(` DATABASE_URL is missing in .env.${nodeEnv}`);
}

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  logging: false,
});
