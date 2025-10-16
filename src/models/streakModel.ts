import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./userModel";

interface StreakAttributes {
  id: string;
  userId: string;
  count: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type StreakCreationAttributes = Optional<StreakAttributes, "id" | "createdAt" | "updatedAt">;

export class Streak extends Model<StreakAttributes, StreakCreationAttributes>
  implements StreakAttributes {
  public id!: string;
  public userId!: string;
  public count!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Streak.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "streaks",
    timestamps: true,
  }
);

Streak.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Streak, { foreignKey: "userId", as: "streaks" });
