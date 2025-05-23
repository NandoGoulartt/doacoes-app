import { z } from 'zod'

export const doacaoSchema = z.object({
  descricao: z
    .string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .max(500, 'Descrição deve ter no máximo 500 caracteres')
    .trim(),
  quantidade: z
    .number()
    .min(1, 'Quantidade deve ser maior que zero')
    .max(1000000, 'Quantidade deve ser menor que 1.000.000'),
  foto_url: z
    .string()
    .url('URL da foto inválida')
    .optional()
    .nullable()
    .transform(val => val || undefined),
  campanha_id: z
    .string()
    .min(1, 'ID da campanha é obrigatório')
    .trim(),
})

export type DoacaoInput = z.infer<typeof doacaoSchema> 