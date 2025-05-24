import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { JWTPayload } from '@/middleware/auth'

export async function GET(request: Request) {
  try {
    const userHeader = request.headers.get('user')
    if (!userHeader) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const payload = JSON.parse(userHeader) as JWTPayload

    const user = await prisma.user.findUnique({
      where: { id: payload.user_id },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({ user })
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

export async function PUT(request: Request) {
  try {
    const userHeader = request.headers.get('user')
    if (!userHeader) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const payload = JSON.parse(userHeader) as JWTPayload
    const body = await request.json()

    if (!body.nome || typeof body.nome !== 'string' || body.nome.length < 3) {
      return NextResponse.json(
        { error: 'Nome deve ter pelo menos 3 caracteres' },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { id: payload.user_id },
      data: { nome: body.nome },
      select: {
        id: true,
        nome: true,
        email: true,
        tipo: true,
      }
    })

    return NextResponse.json({ user })
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