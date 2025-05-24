import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verify } from '@/middleware/auth'
import { z } from 'zod'

const doacaoSchema = z.object({
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  valor: z.number().positive('Valor deve ser positivo').optional(),
  quantidade: z.number().int('Quantidade deve ser um número inteiro').positive('Quantidade deve ser positiva').optional(),
  foto_url: z.string().url('URL inválida').optional(),
})

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const token = request.headers.get('cookie')?.split('auth_token=')[1]
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const payload = await verify(token)
    if (payload.tipo !== 'DOADOR') {
      return NextResponse.json({ error: 'Apenas pessoas físicas podem fazer doações' }, { status: 403 })
    }

    const campanha = await prisma.campanha.findUnique({
      where: { id },
      select: {
        id: true,
        tipo: true,
        data_inicio: true,
        data_fim: true,
      },
    })

    if (!campanha) {
      return NextResponse.json({ error: 'Campanha não encontrada' }, { status: 404 })
    }

    const hoje = new Date()
    const dataInicio = new Date(campanha.data_inicio)
    const dataFim = new Date(campanha.data_fim)
    
    if (hoje < dataInicio) {
      return NextResponse.json({ error: 'Campanha ainda não iniciou' }, { status: 400 })
    }
    
    if (hoje > dataFim) {
      return NextResponse.json({ error: 'Campanha já encerrou' }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = doacaoSchema.parse(body)

    // Validações específicas por tipo
    if (campanha.tipo === 'VAQUINHA') {
      if (!validatedData.valor) {
        return NextResponse.json(
          { error: 'Valor é obrigatório para doações em dinheiro' },
          { status: 400 }
        )
      }
    } else {
      if (!validatedData.quantidade) {
        return NextResponse.json(
          { error: 'Quantidade é obrigatória para doações de itens' },
          { status: 400 }
        )
      }
    }

    const doacao = await prisma.doacao.create({
      data: {
        descricao: validatedData.descricao,
        valor: validatedData.valor,
        quantidade: validatedData.quantidade,
        foto_url: validatedData.foto_url,
        campanha_id: id,
        doador_id: payload.user_id,
      },
      include: {
        doador: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    })

    return NextResponse.json(doacao)
  } catch (error) {
    console.error('Erro ao criar doação:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Erro ao criar doação' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const doacoes = await prisma.doacao.findMany({
      where: {
        campanha_id: id,
      },
      include: {
        doador: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return NextResponse.json(doacoes)
  } catch (error) {
    console.error('Erro ao listar doações:', error)
    return NextResponse.json(
      { error: 'Erro ao listar doações' },
      { status: 500 }
    )
  }
} 