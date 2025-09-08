import z from 'zod';

const envSchema = z.object({
    PORT: z
        .string()
        .min(4, { message: 'Número da porta dever ter pelo menos 4 caracteres.' })
        .transform(value => Number(value)),
    HOST_USERNAME: z
        .string()
        .min(1, { message: 'O valor do HOST_USERNAME é obrigatório.' }),
    HOST_PASSWORD: z
        .string()
        .min(1, { message: 'O valor do HOST_PASSOWORD é obrigatório.' }),
    HOST_CLUSTER: z
        .string()
        .min(1, { message: 'O valor do HOST_CLUSTER é obrigatório.' }),
    HOST_DATABASE: z
        .string()
        .min(1, { message: 'O valor do HOST_DATABASE é obrigatório.' }),
});

export const env = envSchema.parse(process.env);
