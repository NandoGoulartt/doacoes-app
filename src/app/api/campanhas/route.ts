import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { campanhaSchema, campanhaFilterSchema } from '@/lib/validations/campanha'
import { JWTPayload } from '@/middleware/auth'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = {
      localizacao: searchParams.get('localizacao'),
      data_inicio: searchParams.get('data_inicio'),
      data_fim: searchParams.get('data_fim'),
    }

    const validatedFilters = campanhaFilterSchema.parse(filters)
    
    const where = {
      ...(validatedFilters.localizacao && {
        localizacao: validatedFilters.localizacao
      }),
      ...(validatedFilters.data_inicio && {
        data_inicio: {
          gte: validatedFilters.data_inicio
        }
      }),
      ...(validatedFilters.data_fim && {
        data_fim: {
          lte: validatedFilters.data_fim
        }
      })
    }

    const hoje = new Date()
    const campanhas = await prisma.campanha.findMany({
      where,
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

    // Adiciona o status para cada campanha
    const campanhasComStatus = campanhas.map(campanha => {
      const dataInicio = new Date(campanha.data_inicio)
      const dataFim = new Date(campanha.data_fim)
      
      const status = hoje < dataInicio 
        ? 'AGUARDANDO'
        : hoje > dataFim 
          ? 'ENCERRADA' 
          : 'ATIVA'

      return {
        ...campanha,
        status
      }
    })

    return NextResponse.json(campanhasComStatus)
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

    if (user.tipo !== 'INSTITUICAO') {
      return NextResponse.json(
        { error: 'Apenas instituições podem criar campanhas' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = campanhaSchema.parse(body)

    const campanha = await prisma.campanha.create({
      data: {
        ...validatedData,
        instituicao_id: user.user_id,
      },
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

    return NextResponse.json(campanha, { status: 201 })
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