import type { Request, Response } from 'express';
import { ZodError } from 'zod';
import { changeTasksCompletionSchema } from '../schemas/change-task-completion-schema.js';
import { createTaskSchema } from '../schemas/create-task-schema.js';
import {
  updateTaskBodySchema,
  updateTaskParamsSchema,
} from '../schemas/update-task-schemas.js';
import TaskService from '../services/tasks-services.js';
import { handleValidationError } from '../utils/validation-errors.js';

class TaskControllerClass {
  // 🟢 Criar tarefa
  async createTask(req: Request, res: Response) {
    try {
      const data = createTaskSchema.parse(req.body);
      const newTask = await TaskService.createTask(data);

      return res.status(201).json({
        message: 'Tarefa criada com sucesso!',
        task: newTask, // ✅ corrigido
      });
    } catch (error: any) {
      console.error('Erro em createTask:', error);
      if (error instanceof ZodError) return handleValidationError(error, res);

      return res.status(500).json({
        message: 'Erro ao criar tarefa',
        error: error.message,
      });
    }
  }

  // 🟡 Listar todas as tarefas
  async getAllTasks(_: Request, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks();
      return res.status(200).json({
        message: 'Tarefas obtidas com sucesso!',
        tasks: tasks, // ✅ corrigido
      });
    } catch (error: any) {
      console.error('Erro em getAllTasks:', error);
      return res.status(500).json({
        message: 'Erro ao obter tarefas',
        error: error.message,
      });
    }
  }

  // 🟣 Atualizar tarefa existente
  async updateTask(req: Request, res: Response) {
    try {
      const params = updateTaskParamsSchema.parse(req.params);
      const { id } = params;
      const data = updateTaskBodySchema.parse(req.body);

      const updatedTask = await TaskService.updateTask({ id, ...data });

      if (!updatedTask) {
        return res.status(404).json({ message: 'Tarefa não encontrada.' });
      }

      return res.status(200).json({
        message: 'Tarefa atualizada com sucesso!',
        task: updatedTask, // ✅ corrigido
      });
    } catch (error: any) {
      console.error('Erro em updateTask:', error);
      if (error instanceof ZodError) return handleValidationError(error, res);

      return res.status(500).json({
        message: 'Erro ao atualizar tarefa',
        error: error.message,
      });
    }
  }

  // 🔄 Alternar conclusão da tarefa
  async changeTaskCompletion(req: Request, res: Response) {
    try {
      const params = changeTasksCompletionSchema.parse(req.params);
      const { id } = params;

      const taskCompleted = await TaskService.changeTasksCompletion({ id });

      res.status(200).json({
        message: 'Tarefa atualizada com sucesso!',
        task: taskCompleted,
      });
    } catch (error: any) {
      console.error('Erro em changeTaskCompletion:', error);
      res.status(500).json({
        message: 'Erro ao alterar conclusão da tarefa',
        error: error.message,
      });
    }
  }

  // 🔴 Deletar tarefa
  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deletedTask = await TaskService.deleteTask({ id });

      return res.status(200).json({
        message: 'Tarefa deletada com sucesso!',
        task: deletedTask,
      });
    } catch (error: any) {
      console.error('Erro em deleteTask:', error);
      return res.status(500).json({
        message: 'Erro ao deletar tarefa',
        error: error.message,
      });
    }
  }
}

export default new TaskControllerClass();
