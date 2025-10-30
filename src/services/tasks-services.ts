import type {
  CreateTaskProps,
  changeTasksCompletionProps,
  UpdateTaskProps,
} from '../interfaces/tasks-service.js';
import { TaskModel } from '../models/index.js';

class TaskService {
  async createTask({ title, description, images }: CreateTaskProps) {
    return await TaskModel.create({ title, description, images });
  }

  async getAllTasks() {
    return await TaskModel.find();
  }

  async updateTask({ id, title, description, images }: UpdateTaskProps) {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { title, description, images },
      { new: true },
    );
    if (!updatedTask) throw new Error('Task not found');
    return updatedTask;
  }

  async changeTasksCompletion({ id }: changeTasksCompletionProps) {
    const taskCompleted = await TaskModel.findByIdAndUpdate(
      id,
      [{ $set: { completed: { $not: '$completed' } } }],
      { new: true },
    );
    if (!taskCompleted) throw new Error('Task not found');
    return taskCompleted;
  }

  async deleteTask({ id }: { id: string }) {
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) throw new Error('Task not found');
    return deletedTask;
  }
}

export default new TaskService();
