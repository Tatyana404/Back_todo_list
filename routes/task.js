const { Router } = require('express');
const TaskController = require('../controller/task');
const paginate = require('../middlewares/paginate.mw');

const TaskRouter = Router();

TaskRouter.post('/', TaskController.createTask);
TaskRouter.patch('/:taskId', TaskController.updateTask);
TaskRouter.get('/', paginate, TaskController.getAllTasks);
TaskRouter.delete('/:taskId', TaskController.deleteTask);

module.exports = TaskRouter;