import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

// Configuração do transportador SMTP do Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  debug: true,
  logger: true
})

const esqueceuSenhaSchema = z.object({
  email: z.string().email('Email inválido'),
})

// Função para gerar token seguro
function gerarResetToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Função para obter a URL base
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}

// Função para enviar email
async function enviarEmailRedefinicao(params: {
  email: string
  nome: string
  resetLink: string
}): Promise<void> {
  const { email, nome, resetLink } = params

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Redefinição de Senha - DoAção',
    html: `
      <h1>Redefinição de Senha</h1>
      <p>Olá ${nome},</p>
      <p>Você solicitou a redefinição de sua senha. Clique no link abaixo para criar uma nova senha:</p>
      <p><a href="${resetLink}">Redefinir minha senha</a></p>
      <p>Este link é válido por 1 hora.</p>
      <p>Se você não solicitou esta redefinição, ignore este email.</p>
      <p>Atenciosamente,<br>Equipe DoAção</p>
    `,
  })
}

export async function POST(request: Request) {
  console.log('Iniciando processo de redefinição de senha')
  
  try {
    // Verifica configuração do SMTP
    try {
      await transporter.verify()
      console.log('Configuração SMTP verificada com sucesso')
    } catch (error) {
      console.error('Erro na configuração SMTP:', error)
      throw new Error('Erro na configuração do servidor de email')
    }

    // Valida o corpo da requisição
    const body = await request.json()
    const validatedData = esqueceuSenhaSchema.parse(body)
    console.log('Dados validados com sucesso')

    // Busca usuário
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (!user) {
      console.log('Email não encontrado:', validatedData.email)
      // Retornamos 200 mesmo se o usuário não existir por segurança
      return NextResponse.json({
        message: 'Se o email estiver cadastrado, você receberá as instruções para redefinir sua senha.'
      })
    }

    // Gera token e data de expiração
    const resetToken = gerarResetToken()
    const tokenExpires = new Date(Date.now() + 3600000) // 1 hora

    // Salva o token no banco
    await prisma.user.update({
      where: { id: user.id },
      data: {
        reset_token: resetToken,
        reset_token_expires: tokenExpires,
      },
    })
    console.log('Token de redefinição salvo com sucesso')

    // Monta o link de redefinição
    const baseUrl = getBaseUrl()
    const resetLink = `${baseUrl}/redefinir-senha?token=${resetToken}`
    console.log('Link de redefinição gerado:', resetLink)

    try {
      // Envia o email
      await enviarEmailRedefinicao({
        email: user.email,
        nome: user.nome,
        resetLink
      })
      console.log('Email de redefinição enviado com sucesso')
    } catch (emailError) {
      console.error('Erro ao enviar email:', emailError)
      // Em caso de erro no envio, mostramos o link no console para desenvolvimento
      console.log('Link de redefinição de senha (fallback):', resetLink)
    }

    return NextResponse.json({
      message: 'Se o email estiver cadastrado, você receberá as instruções para redefinir sua senha.'
    })
  } catch (error) {
    console.error('Erro ao processar solicitação de redefinição de senha:', error)
    
    // Trata erros específicos
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos fornecidos' },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message === 'Erro na configuração do servidor de email') {
      return NextResponse.json(
        { error: 'Erro temporário no servidor. Tente novamente mais tarde.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação. Tente novamente.' },
      { status: 500 }
    )
  }
} 