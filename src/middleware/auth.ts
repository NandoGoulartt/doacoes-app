import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'seu-segredo-aqui'

export interface JWTPayload {
  user_id: string
  email: string
  tipo: 'DOADOR' | 'INSTITUICAO'
}

export function getJwtSecretKey(): string {
  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET não configurado, usando valor padrão')
  }
  return JWT_SECRET
}

export async function sign(payload: JWTPayload): Promise<string> {
  return jwt.sign(payload, getJwtSecretKey(), { expiresIn: '7d' })
}

export async function verify(token: string): Promise<JWTPayload> {
  const payload = jwt.verify(token, getJwtSecretKey()) as JWTPayload
  return payload
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }

  try {
    const payload = await verify(token)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(payload))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Token inválido' },
      { status: 401 }
    )
  }
}

export const config = {
  matcher: [
    '/api/campanhas/:path*',
    '/api/doacoes/:path*',
  ],
} 