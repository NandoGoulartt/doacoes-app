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

    const doacoes = await prisma.doacao.findMany({
      where: payload.tipo === 'INSTITUICAO'
        ? {
            campanha: {
              instituicao_id: payload.user_id
            }
          }
        : {
            doador_id: payload.user_id
          },
      take: 5,
      orderBy: {
        data_doacao: 'desc'
      },
      select: {
        id: true,
        descricao: true,
        data_doacao: true,
        campanha: {
          select: {
            titulo: true,
            instituicao: {
              select: {
                nome: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json(doacoes)
  } catch (error) {
    console.error('Erro ao buscar doações recentes:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar doações recentes' },
      { status: 500 }
    )
  }
} 