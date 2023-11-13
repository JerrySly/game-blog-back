'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Articles', 'isHidden', {
      defaultValue: false,
      type: Sequelize.BOOLEAN
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Artilces', 'isHidden');
  }
};
