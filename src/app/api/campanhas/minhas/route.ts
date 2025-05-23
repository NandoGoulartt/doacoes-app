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

    const user = JSON.parse(userHeader) as JWTPayload

    if (user.tipo !== 'INSTITUICAO') {
      return NextResponse.json(
        { error: 'Apenas instituições podem acessar suas campanhas' },
        { status: 403 }
      )
    }

    const campanhas = await prisma.campanha.findMany({
      where: {
        instituicao_id: user.user_id
      },
      include: {
        instituicao: {
          select: {
            id: true,
            nome: true,
            email: true,
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return NextResponse.json(campanhas)
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