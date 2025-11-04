import dotenv from 'dotenv';
import z from 'zod';

// 🔹 Carrega as variáveis do arquivo .env antes de qualquer validação
dotenv.config();

const envSchema = z.object({
  PORT: z
    .string()
    .min(4, { message: 'Número da porta deve ter pelo menos 4 caracteres.' })
    .transform(value => Number(value)),
  HOST_USERNAME: z
    .string()
    .min(1, { message: 'O valor do HOST_USERNAME é obrigatório.' }),
  HOST_PASSWORD: z
    .string()
    .min(1, { message: 'O valor do HOST_PASSWORD é obrigatório.' }),
  HOST_CLUSTER: z
    .string()
    .min(1, { message: 'O valor do HOST_CLUSTER é obrigatório.' }),
  HOST_DATABASE: z
    .string()
    .min(1, { message: 'O valor do HOST_DATABASE é obrigatório.' }),
});

export const env = envSchema.parse(process.env);
