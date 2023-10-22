import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
  declare id: number;
  declare email: string;
  password: string;
}

export class Article extends Model {
  declare id: number;
  mainPicture: string;
  startText: string;
  mainText: string;
  title: string;
}

export const defineModels = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { sequelize })
  Article.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    mainPicture: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    startText: {
      type: DataTypes.STRING
    },
    mainText: {
      type: DataTypes.STRING
    },
  }, { sequelize });
  sequelize.sync();
}