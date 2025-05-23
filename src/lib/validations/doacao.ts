import { z } from 'zod'

export const doacaoSchema = z.object({
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  quantidade: z.number().min(1, 'Quantidade deve ser maior que zero'),
  foto_url: z.string().url('URL da foto inválida').optional(),
  campanha_id: z.string().min(1, 'ID da campanha é obrigatório'),
})

export type DoacaoInput = z.infer<typeof doacaoSchema> 