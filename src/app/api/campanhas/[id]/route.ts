import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const campanha = await prisma.campanha.findUnique({
      where: { id },
      include: {
        instituicao: {
          select: {
            id: true,
            nome: true,
            email: true,
          }
        },
        itens_necessarios: true,
        pontos_coleta: true
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

    console.log('Debug datas:', {
      hoje: hoje.toISOString(),
      dataInicio: dataInicio.toISOString(),
      dataFim: dataFim.toISOString(),
      campanha_id: id
    })

    const status = hoje < dataInicio 
      ? 'AGUARDANDO'
      : hoje > dataFim 
        ? 'ENCERRADA' 
        : 'ATIVA'

    console.log('Status calculado:', status)

    const doacoes = await prisma.doacao.findMany({
      where: { campanha_id: id },
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

    const totalDoacoes = doacoes.reduce((acc, doacao) => {
      if (doacao.valor) return acc + doacao.valor
      if (doacao.quantidade) return acc + doacao.quantidade
      return acc
    }, 0)

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