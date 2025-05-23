import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    const hoje = new Date()
    const dataInicio = new Date(campanha.data_inicio)
    const dataFim = new Date(campanha.data_fim)

    const status = hoje < dataInicio 
      ? 'AGUARDANDO'
      : hoje > dataFim 
        ? 'ENCERRADA' 
        : 'ATIVA'

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

    const totalDoacoes = doacoes.reduce((acc, doacao) => acc + doacao.quantidade, 0)

    return NextResponse.json({
      campanha: {
        ...campanha,
        status,
      },
      doacoes,
      estatisticas: {
        totalDoacoes,
        numeroDoacoes: doacoes.length,
      }
    })
  } catch (error) {
    console.error('Erro ao buscar campanha:', error)
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 