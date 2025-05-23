import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { doacaoSchema } from '@/lib/validations/doacao'
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

    const doacoes = await prisma.doacao.findMany({
      where: {
        doador_id: user.user_id
      },
      include: {
        campanha: {
          select: {
            id: true,
            titulo: true,
            descricao: true,
            instituicao: {
              select: {
                id: true,
                nome: true,
                email: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json(doacoes)
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

export async function POST(request: Request) {
  try {
    const userHeader = request.headers.get('user')
    if (!userHeader) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const user = JSON.parse(userHeader) as JWTPayload

    if (user.tipo !== 'DOADOR') {
      return NextResponse.json(
        { error: 'Apenas doadores podem criar doações' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = doacaoSchema.parse(body)

    const campanha = await prisma.campanha.findUnique({
      where: { id: validatedData.campanha_id }
    })

    if (!campanha) {
      return NextResponse.json(
        { error: 'Campanha não encontrada' },
        { status: 404 }
      )
    }

    const hoje = new Date()
    const dataInicio = new Date(campanha.data_inicio)
    const dataFim = new Date(campanha.data_fim)

    if (hoje < dataInicio) {
      return NextResponse.json(
        { error: 'Esta campanha ainda não foi iniciada' },
        { status: 400 }
      )
    }

    if (hoje > dataFim) {
      return NextResponse.json(
        { error: 'Esta campanha já foi encerrada' },
        { status: 400 }
      )
    }

    const doacao = await prisma.doacao.create({
      data: {
        ...validatedData,
        doador_id: user.user_id,
      },
      include: {
        campanha: {
          select: {
            id: true,
            titulo: true,
            descricao: true,
            instituicao: {
              select: {
                id: true,
                nome: true,
                email: true,
              }
            }
          }
        }
      }
    })

    return NextResponse.json(doacao, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar doação:', error)

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
  } finally {
    await prisma.$disconnect()
  }
} 