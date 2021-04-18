const { Router } = require('express');
const TaskController = require('../controller/task');
const paginate = require('../middlewares/paginate.mw');

const TaskRouter = Router();

TaskRouter.route('/')
  .post(TaskController.createTask)
  .get(paginate, TaskController.getAllTasks);

TaskRouter.route('/:taskId')
  .patch(TaskController.updateTask)
  .delete(TaskController.deleteTask);

module.exports = TaskRouter;
