'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.createTable('Users', {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: DataTypes.STRING,
      password: DataTypes.TEXT,
      role: DataTypes.UUID,
    });
    queryInterface.createTable('Roles', {
      uuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: DataTypes.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.describeTable('Users');
    queryInterface.describeTable('Roles');
  }
};
