import { Router } from 'express';
import TaskController from '../controllers/index.js';

export const taskRoutes = Router();

taskRoutes.post('/', (req, res) => TaskController.createTask(req, res));
taskRoutes.get('/', (req, res) => TaskController.getAllTasks(req, res));
taskRoutes.put('/:id', (req, res) => TaskController.updateTask(req, res));
taskRoutes.put('/change-task-completion/:id', (req, res) =>
  TaskController.changeTaskCompletion(req, res),
);
taskRoutes.delete('/:id', (req, res) => TaskController.deleteTask(req, res));
