import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from '@/middleware/auth'
import { z } from 'zod'

const itemNecessarioSchema = z.object({
  nome: z.string().min(1, 'Nome do item é obrigatório'),
  descricao: z.string().optional(),
})

const pontoColetaSchema = z.object({
  nome: z.string().min(1, 'Nome do ponto de coleta é obrigatório'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  horario: z.string().min(1, 'Horário é obrigatório'),
})

const campanhaSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  localizacao: z.string().min(1, 'Localização é obrigatória'),
  data_inicio: z.string().min(1, 'Data de início é obrigatória'),
  data_fim: z.string().min(1, 'Data de fim é obrigatória'),
  tipo: z.enum(['VAQUINHA', 'ALIMENTE', 'ROUPA']),
  busca_doacoes: z.boolean().optional(),
  itens_necessarios: z.array(itemNecessarioSchema).optional(),
  pontos_coleta: z.array(pontoColetaSchema).optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const localizacao = searchParams.get('localizacao')
    const data_inicio = searchParams.get('data_inicio')
    const data_fim = searchParams.get('data_fim')

    const where = {
      ...(localizacao && { localizacao: { contains: localizacao, mode: 'insensitive' as const } }),
      ...(data_inicio && { data_inicio: { gte: new Date(data_inicio) } }),
      ...(data_fim && { data_fim: { lte: new Date(data_fim) } }),
    }

    const campanhas = await prisma.campanha.findMany({
      where,
      include: {
        instituicao: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        itens_necessarios: true,
        pontos_coleta: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    const hoje = new Date()
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
  } catch {
    return NextResponse.json(
      { error: 'Erro ao listar campanhas' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const token = request.headers.get('cookie')?.split('auth_token=')[1]
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const payload = await verify(token)
    if (payload.tipo !== 'INSTITUICAO') {
      return NextResponse.json({ error: 'Apenas instituições podem criar campanhas' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = campanhaSchema.parse(body)

    if (validatedData.tipo !== 'VAQUINHA') {
      if (!validatedData.itens_necessarios?.length) {
        return NextResponse.json(
          { error: 'É necessário informar pelo menos um item necessário' },
          { status: 400 }
        )
      }

      if (!validatedData.pontos_coleta?.length) {
        return NextResponse.json(
          { error: 'É necessário informar pelo menos um ponto de coleta' },
          { status: 400 }
        )
      }
    }

    const campanha = await prisma.campanha.create({
      data: {
        titulo: validatedData.titulo,
        descricao: validatedData.descricao,
        localizacao: validatedData.localizacao,
        data_inicio: new Date(validatedData.data_inicio + 'T00:00:00Z'),
        data_fim: new Date(validatedData.data_fim + 'T23:59:59Z'),
        tipo: validatedData.tipo,
        busca_doacoes: validatedData.busca_doacoes || false,
        instituicao_id: payload.user_id,
        itens_necessarios: validatedData.tipo !== 'VAQUINHA' ? {
          create: validatedData.itens_necessarios
        } : undefined,
        pontos_coleta: validatedData.tipo !== 'VAQUINHA' ? {
          create: validatedData.pontos_coleta
        } : undefined,
      },
    })

    return NextResponse.json(campanha)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Erro ao criar campanha' },
      { status: 500 }
    )
  }
} 