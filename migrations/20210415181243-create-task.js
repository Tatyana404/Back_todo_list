'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      body: {
        allowNull: false,
        isAlphanumeric: true,
        type: Sequelize.STRING(500),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      deadline: {
        isDate: true,
        type: Sequelize.DATE,
      },
      isDone: {
        field: 'is_done',
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
  },
};
