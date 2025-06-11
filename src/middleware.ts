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
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/cadastro') ||
    request.nextUrl.pathname.startsWith('/esqueci-senha') ||
    request.nextUrl.pathname.startsWith('/redefinir-senha') ||
    request.nextUrl.pathname.startsWith('/api/auth/esqueci-senha') ||
    request.nextUrl.pathname.startsWith('/api/auth/redefinir-senha') ||
    request.nextUrl.pathname === '/'
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    console.log('Token não encontrado, redirecionando para login')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const payload = await verify(token)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(payload))
    requestHeaders.set('x-auth-token', token)

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/campanhas/:path*',
    '/api/campanhas/:path*',
    '/api/doacoes/:path*',
    '/api/auth/me',
    '/perfil',
    '/minhas-doacoes',
    '/api/doacoes',
  ],
} 