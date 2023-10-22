import './generate';
import { Sequelize } from "sequelize";
import { defineModels } from './models';
const sequelize = new Sequelize('GameBlog', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

defineModels(sequelize);
