import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { User } from "./userModel";

interface ArticleAttributes {
  id: string;
  channel: string;
  url: string;
  cimage: string;
  time: string;
  category: string;
  catImage: string;
  level: string;
  levImage: string;
  title: string;
  content: string;
  progress: number;
  userId: string;
}

type ArticleCreationAttributes = Optional<ArticleAttributes, "id" | "progress">;

export class Article extends Model<ArticleAttributes, ArticleCreationAttributes> 
  implements ArticleAttributes {
  public id!: string;
  public channel!: string;
  public url!: string;
  public cimage!: string;
  public time!: string;
  public category!: string;
  public catImage!: string;
  public level!: string;
  public levImage!: string;
  public title!: string;
  public content!: string;
  public progress!: number;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Article.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true,
    },
    channel: { type: DataTypes.TEXT, allowNull: false },
    url: { type: DataTypes.TEXT, allowNull: false },
    cimage: { type: DataTypes.TEXT, allowNull: false },
    time: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.TEXT, allowNull: false },
    catImage: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
    level: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
    levImage: { type: DataTypes.TEXT, allowNull: false, defaultValue: "" },
    title: { type: DataTypes.TEXT, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    progress: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    tableName: "articles",
    timestamps: true,
  }
);

// 
Article.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Article, { foreignKey: "userId" });
