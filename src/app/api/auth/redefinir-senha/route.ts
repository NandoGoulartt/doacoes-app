import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

const redefinirSenhaSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = redefinirSenhaSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { reset_token: validatedData.token }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 400 }
      )
    }

    if (!user.reset_token_expires || user.reset_token_expires < new Date()) {
      return NextResponse.json(
        { error: 'Token expirado' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(validatedData.senha, 10)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        senha: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
      },
    })

    return NextResponse.json({
      message: 'Senha redefinida com sucesso'
    })
  } catch (error) {
    console.error('Erro ao redefinir senha:', error)
    return NextResponse.json(
      { error: 'Erro ao redefinir senha. Tente novamente.' },
      { status: 500 }
    )
  }
} 