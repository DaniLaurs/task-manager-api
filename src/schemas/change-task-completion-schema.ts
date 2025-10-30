import { z } from 'zod';

export const changeTasksCompletionSchema = z.object({
  id: z.string().length(24, { message: 'O id deve conter 24 caracteres.' }),
});
