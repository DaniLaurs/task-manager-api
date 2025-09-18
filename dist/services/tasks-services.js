import { createId } from '@paralleldrive/cuid2';
import { TaskModel } from '../models/index.js';
class TaskService {
    // Criação de uma nova tarefa
    async createTask({ title, description, images }) {
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
    async updateTask({ id, title, description, images }) {
        // Monta apenas os campos que foram fornecidos
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (description !== undefined)
            updateData.description = description;
        if (images !== undefined)
            updateData.images = images;
        // Busca e atualiza a tarefa com base no id customizado
        const updatedTask = await TaskModel.findOneAndUpdate({ id }, // usa o campo "id", não "_id"
        updateData, { new: true });
        // Se nenhuma tarefa foi encontrada, lança erro
        if (!updatedTask) {
            throw new Error('Task not found');
        }
        return { updatedTask };
    }
    async changeTasksCompletion({ id }) {
        const taskCompleted = await TaskModel.findOneAndUpdate({ id }, // buscar pelo campo id customizado
        [{ $set: { completed: { $not: '$completed' } } }], { new: true });
        return {
            taskCompleted,
        };
    }
}
export default new TaskService();
