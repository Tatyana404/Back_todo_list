const createError = require('http-errors');
const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const task = await Task.create(body);

    if (!task) {
      return next(createError(400), 'Error while creating a task');
    }

    res.send({ data: task });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllTasks = async (req, res, next) => {
  try {
    const { pagination = {} } = req;

    const tasks = await Task.findAll({
      ...pagination,
    });

    if (!tasks.length) {
      return next(createError(404, 'No more tasks'));
    }

    res.send({ data: tasks });
  } catch (err) {
    next(err);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
      body,
    } = req;

    const [, [updatedTask]] = await Task.update(body, {
      where: { id: taskId },
      returning: true,
    });

    if (!updatedTask) {
      return next(createError(400), 'Failed to update task');
    }

    res.send({ data: updatedTask });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { taskId },
    } = req;

    const rowsCount = await Task.destroy({ where: { id: taskId } });

    if (rowsCount !== 1) {
      return next(createError(404, 'Task not found'));
    }
    res.send({ data: `${rowsCount} Task successfully deleted` });
  } catch (err) {
    next(err);
  }
};
