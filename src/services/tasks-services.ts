import { createId } from '@paralleldrive/cuid2';
import type {
  CreateTaskProps,
  changeTasksCompletionProps,
  UpdateTaskProps,
} from '../interfaces/tasks-service.js';
import { TaskModel } from '../models/index.js';

class TaskService {
  // Criação de uma nova tarefa
  async createTask({ title, description, images }: CreateTaskProps) {
    const newTask = await TaskModel.create({
      id: createId(),
      title,
      description,
      images,
    });

    return { newTask };
  }

  // Retorna todas as tarefas
  async getAllTasks() {
    const tasks = await TaskModel.find();
    return { tasks };
  }

  // Atualização de tarefa existente
  async updateTask({ id, title, description, images }: UpdateTaskProps) {
    // Monta apenas os campos que foram fornecidos
    const updateData: Partial<UpdateTaskProps> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (images !== undefined) updateData.images = images;

    // Busca e atualiza a tarefa com base no id customizado
    const updatedTask = await TaskModel.findOneAndUpdate(
      { id }, // usa o campo "id", não "_id"
      updateData,
      { new: true }, // retorna o documento atualizado
    );

    // Se nenhuma tarefa foi encontrada, lança erro
    if (!updatedTask) {
      throw new Error('Task not found');
    }

    return { updatedTask };
  }

  async changeTasksCompletion({ id }: changeTasksCompletionProps) {
    const taskCompleted = await TaskModel.findOneAndUpdate(
      { id }, // buscar pelo campo id customizado
      [{ $set: { completed: { $not: '$completed' } } }],
      { new: true },
    );

    return {
      taskCompleted,
    };
  }
}

export default new TaskService();
