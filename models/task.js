'use strict';
const { Model } = require('sequelize');
const { isBefore } = require('date-fns');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {}
  Task.init(
    {
      body: {
        allowNull: false,
        isAlphanumeric: true,
        type: DataTypes.STRING(500),
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      deadline: {
        isDate: true,
        type: DataTypes.DATE,
        validate: {
          isValidDate (value) {
            if (isBefore(new Date(value), new Date())) {
              throw new Error('You cannot create a task in the past tense');
            }
          },
        },
      },
      isDone: {
        field: 'is_done',
        allowNull: false,
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};
