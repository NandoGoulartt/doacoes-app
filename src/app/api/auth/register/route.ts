import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '../../../../generated/prisma'
import { registerSchema } from '@/lib/validations/auth'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(validatedData.senha, 10)

    const user = await prisma.user.create({
      data: {
        nome: validatedData.nome,
        email: validatedData.email,
        senha: hashedPassword,
        tipo: validatedData.tipo,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 