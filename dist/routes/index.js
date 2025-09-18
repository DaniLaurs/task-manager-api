import { Router } from 'express';
import { taskRoutes } from './tasks.routes.js';
const routes = Router();
routes.use('/tasks', taskRoutes);
export default routes;
