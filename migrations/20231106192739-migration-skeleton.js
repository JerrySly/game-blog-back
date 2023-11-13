'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Articles', 'uuid', Sequelize.UUID);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Articles', 'uuid');
  }
};
