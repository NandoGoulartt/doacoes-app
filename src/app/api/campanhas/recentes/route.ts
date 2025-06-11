import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const campanhas = await prisma.campanha.findMany({
      take: 5,
      orderBy: {
        data_inicio: 'desc'
      },
      select: {
        id: true,
        titulo: true,
        tipo: true,
        data_inicio: true,
        data_fim: true,
        instituicao: {
          select: {
            nome: true
          }
        }
      },
      where: {
        data_fim: {
          gt: new Date()
        }
      }
    })

    return NextResponse.json(campanhas.map(campanha => ({
      ...campanha,
      status: new Date() > new Date(campanha.data_inicio) ? 'ATIVA' : 'AGUARDANDO'
    })))
  } catch (error) {
    console.error('Erro ao buscar campanhas recentes:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar campanhas recentes' },
      { status: 500 }
    )
  }
} 