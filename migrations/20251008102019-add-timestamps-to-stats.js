"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("stats", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });

    await queryInterface.addColumn("stats", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("stats", "createdAt");
    await queryInterface.removeColumn("stats", "updatedAt");
  },
};
