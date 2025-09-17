import { z } from 'zod';
import { createTaskSchema } from './create-task-schema.js';

// Params continua igual
export const updateTaskParamsSchema = z.object({
  id: z.string().min(24, { message: 'O id padrão deve conter 24 caracteres.' }),
});

// Body do update: permite que todos os campos sejam opcionais
export const updateTaskBodySchema = z.object({
  title: createTaskSchema.shape.title.optional(),
  description: createTaskSchema.shape.description.optional(),
  images: createTaskSchema.shape.images.optional(),
});
