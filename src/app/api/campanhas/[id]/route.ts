import { NextResponse } from 'next/server'
import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const campanha = await prisma.campanha.findUnique({
      where: { id: params.id },
      include: {
        instituicao: {
          select: {
            id: true,
            nome: true,
            email: true,
          }
        }
      }
    })

    if (!campanha) {
      return NextResponse.json(
        { error: 'Campanha não encontrada' },
        { status: 404 }
      )
    }

    const doacoes = await prisma.doacao.findMany({
      where: { campanha_id: params.id },
      include: {
        doador: {
          select: {
            id: true,
            nome: true,
          }
        }
      },
      orderBy: {
        data_doacao: 'desc'
      }
    })

    return NextResponse.json({
      campanha,
      doacoes,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 