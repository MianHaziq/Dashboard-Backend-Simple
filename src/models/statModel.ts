import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./userModel";

interface StatAttributes {
  id: string;
  title: string;
  total: number;
  image: string;
  userId: string;
}

interface StatCreationAttributes extends Optional<StatAttributes, "id"> {}

export class Stat
  extends Model<StatAttributes, StatCreationAttributes>
  implements StatAttributes
{
  public id!: string;
  public title!: string;
  public total!: number;
  public image!: string;
  public userId!: string;
}

Stat.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "stats",
    timestamps: true, 
  }
);

Stat.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Stat, { foreignKey: "userId", onDelete: "CASCADE" });
