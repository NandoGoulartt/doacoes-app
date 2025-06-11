import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from '@/middleware'

export async function GET(request: Request) {
  try {
    const token = request.headers.get('x-auth-token')
    if (!token) {
      return NextResponse.json({ error: 'Token não fornecido' }, { status: 401 })
    }

    const payload = await verify(token)
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    if (payload.tipo === 'INSTITUICAO') {
      const [totalCampanhas, campanhasAtivas, totalDoacoes] = await Promise.all([
        prisma.campanha.count({
          where: { instituicao_id: payload.user_id }
        }),
        prisma.campanha.count({
          where: {
            instituicao_id: payload.user_id,
            data_fim: {
              gt: new Date()
            }
          }
        }),
        prisma.doacao.count({
          where: {
            campanha: {
              instituicao_id: payload.user_id
            }
          }
        })
      ])

      // Buscar doadores únicos
      const doadoresUnicos = await prisma.doacao.groupBy({
        by: ['doador_id'],
        where: {
          campanha: {
            instituicao_id: payload.user_id,
            data_fim: {
              gt: new Date()
            }
          }
        }
      })

      return NextResponse.json({
        total_campanhas: totalCampanhas,
        campanhas_ativas: campanhasAtivas,
        total_doacoes: totalDoacoes,
        doacoes_mes_atual: 0,
        impacto_social: doadoresUnicos.length
      })
    } else {
      const [totalDoacoes, doacoesMesAtual] = await Promise.all([
        prisma.doacao.count({
          where: { doador_id: payload.user_id }
        }),
        prisma.doacao.count({
          where: {
            doador_id: payload.user_id,
            data_doacao: {
              gte: startOfMonth
            }
          }
        })
      ])

      // Buscar campanhas únicas
      const campanhasUnicas = await prisma.doacao.groupBy({
        by: ['campanha_id'],
        where: {
          doador_id: payload.user_id
        }
      })

      // Buscar campanhas ativas que o usuário doou
      const campanhasAtivas = await prisma.doacao.groupBy({
        by: ['campanha_id'],
        where: {
          doador_id: payload.user_id,
          campanha: {
            data_fim: {
              gt: new Date()
            }
          }
        }
      })

      return NextResponse.json({
        total_doacoes: totalDoacoes,
        doacoes_mes_atual: doacoesMesAtual,
        total_campanhas: campanhasUnicas.length,
        campanhas_ativas: campanhasAtivas.length,
        impacto_social: campanhasAtivas.length
      })
    }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
} 