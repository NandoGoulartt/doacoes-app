import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'seu-segredo-aqui'

export interface JWTPayload {
  user_id: string
  email: string
  tipo: 'DOADOR' | 'INSTITUICAO'
  [key: string]: string | undefined
}

interface JoseJWTPayload extends jose.JWTPayload {
  user_id?: string
  email?: string
  tipo?: 'DOADOR' | 'INSTITUICAO'
}

export function getJwtSecretKey(): Uint8Array {
  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET não configurado, usando valor padrão')
  }
  return new TextEncoder().encode(JWT_SECRET)
}

export async function sign(payload: JWTPayload): Promise<string> {
  const secret = getJwtSecretKey()
  return new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verify(token: string): Promise<JWTPayload> {
  try {
    const { payload } = await jose.jwtVerify(token, getJwtSecretKey())
    const { user_id, email, tipo, ...rest } = payload as JoseJWTPayload
    if (!user_id || !email || !tipo) {
      throw new Error('Token inválido')
    }
    return { user_id, email, tipo, ...rest } as JWTPayload
  } catch (error) {
    throw error
  }
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
  } catch {
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