import { z } from 'zod'

export const campanhaSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  localizacao: z.string().min(3, 'Localização deve ter pelo menos 3 caracteres'),
  data_inicio: z.string().transform((str) => new Date(str)),
  data_fim: z.string().transform((str) => new Date(str)),
})

export const campanhaFilterSchema = z.object({
  localizacao: z.string().optional(),
  data_inicio: z.string().optional().transform((str) => str ? new Date(str) : undefined),
  data_fim: z.string().optional().transform((str) => str ? new Date(str) : undefined),
})

export type CampanhaInput = z.infer<typeof campanhaSchema>
export type CampanhaFilter = z.infer<typeof campanhaFilterSchema> 