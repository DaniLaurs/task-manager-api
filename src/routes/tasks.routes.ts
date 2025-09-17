import { Router } from 'express';
import TaskController from '../controllers/index.js'; // import da instância do controller

export const taskRoutes = Router();

// Rotas
taskRoutes.post('/', (req, res) => TaskController.createTask(req, res));
taskRoutes.get('/', (req, res) => TaskController.getAllTasks(req, res));
taskRoutes.put('/:id', (req, res) => TaskController.updateTask(req, res));
