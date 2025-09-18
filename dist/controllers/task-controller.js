import { ZodError } from 'zod';
import { changeTasksCompletionSchema } from '../schemas/change-task-completion-schema.js';
import { createTaskSchema } from '../schemas/create-task-schema.js';
import { updateTaskBodySchema, updateTaskParamsSchema, } from '../schemas/update-task-schemas.js';
import TaskService from '../services/index.js';
import tasksServices from '../services/tasks-services.js';
import { handleValidationError } from '../utils/validation-errors.js';
class TaskControllerClass {
    // Criar tarefa
    async createTask(req, res) {
        try {
            const data = createTaskSchema.parse(req.body);
            const newTask = await TaskService.createTask(data);
            return res.status(201).json({
                message: 'Tarefa criada com sucesso!',
                task: newTask.newTask,
            });
        }
        catch (error) {
            console.error('Erro em createTask:', error);
            if (error instanceof ZodError) {
                return handleValidationError(error, res);
            }
            return res.status(500).json({
                message: 'Erro ao criar tarefa',
                error: error.message,
            });
        }
    }
    // Listar todas as tarefas
    async getAllTasks(_, res) {
        try {
            const tasks = await TaskService.getAllTasks();
            return res.status(200).json({
                message: 'Tarefas obtidas com sucesso!',
                tasks: tasks.tasks,
            });
        }
        catch (error) {
            console.error('Erro em getAllTasks:', error);
            return res.status(500).json({
                message: 'Erro ao obter tarefas',
                error: error.message,
            });
        }
    }
    // Atualizar tarefa (parcial)
    async updateTask(req, res) {
        try {
            const params = updateTaskParamsSchema.parse(req.params);
            const id = params.id.trim(); // <-- Remove espaços e quebras de linha
            const data = updateTaskBodySchema.parse(req.body);
            console.log('Params:', { id });
            console.log('Body:', data);
            const result = await TaskService.updateTask({ id, ...data });
            console.log('Result from service:', result);
            if (!result.updatedTask) {
                return res.status(404).json({ message: 'Tarefa não encontrada.' });
            }
            return res.status(200).json({
                message: 'Tarefa atualizada com sucesso!',
                task: result.updatedTask,
            });
        }
        catch (error) {
            console.error('Erro em updateTask:', error);
            if (error instanceof ZodError) {
                return handleValidationError(error, res);
            }
            return res.status(500).json({
                message: 'Erro ao atualizar tarefa',
                error: error.message,
            });
        }
    }
    async changeTaskCompletion(req, res) {
        try {
            const params = changeTasksCompletionSchema.parse(req.params);
            const { id } = params;
            const taskCompleted = await tasksServices.changeTasksCompletion({ id });
            res.status(200).json({
                message: 'Tarefa atualizada com sucesso!',
                task: taskCompleted,
            });
        }
        catch (_error) { }
    }
}
export default new TaskControllerClass();
