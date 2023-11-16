'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   queryInterface.addColumn('Users', 'email', {
    type: DataTypes.STRING,
    allowNull: false,
   })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'email');
  }
};
