import { z } from 'zod'
import { TipoUsuario } from '@prisma/client'

export const registerSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  tipo: z.enum([TipoUsuario.DOADOR, TipoUsuario.INSTITUICAO], {
    errorMap: () => ({ message: 'Tipo deve ser DOADOR ou INSTITUICAO' })
  })
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema> 