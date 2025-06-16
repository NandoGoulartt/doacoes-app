import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  },
  debug: true,
  logger: true
})

export async function POST(request: Request) {
  try {
    console.log('Iniciando processamento da mensagem de contato...')
    const body = await request.json()
    const { nome, email, assunto, mensagem } = body

    console.log('Dados recebidos:', { nome, email, assunto, mensagem })

    if (!nome || !email || !assunto || !mensagem) {
      console.log('Erro de validação: campos obrigatórios faltando')
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Variáveis de ambiente não configuradas:', {
        GMAIL_USER: !!process.env.GMAIL_USER,
        GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD
      })
      throw new Error('Configuração de email não encontrada')
    }

    try {
      await transporter.verify()
      console.log('Configuração SMTP verificada com sucesso')
    } catch (error) {
      console.error('Erro na configuração SMTP:', error)
      throw new Error('Erro na configuração do servidor de email')
    }

    console.log('Enviando email para:', process.env.GMAIL_USER)

    // Envia o email
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `[Contato] ${assunto}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    })

    console.log('Email enviado com sucesso:', info.messageId)
    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error: Error | unknown) {
    console.error('Erro detalhado ao processar mensagem de contato:', error)
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    )
  }
} 