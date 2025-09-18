import { z } from 'zod';

export const changeTasksCompletionSchema = z.object({
  id: z.string().min(1, { message: 'ID inválido' }),
});
