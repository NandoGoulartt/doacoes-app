'use client';

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

interface User {
  tipo: 'DOADOR' | 'INSTITUICAO'
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    async function loadUser() {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        if (response.ok) {
          setUser(data.user)
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
      }
    }
    loadUser()
  }, [])

  async function handleLogout() {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Falha ao fazer logout')
      }
      router.push('/login')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">DoAção</span>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/dashboard"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === '/dashboard'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/campanhas"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname.startsWith('/campanhas')
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Campanhas
            </Link>
            {user?.tipo === 'INSTITUICAO' && (
              <Link
                href="/minhas-campanhas"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === '/minhas-campanhas'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Minhas Campanhas
              </Link>
            )}
            <Link
              href="/minhas-doacoes"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                pathname === '/minhas-doacoes'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Minhas Doações
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/perfil"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Meu Perfil
              </Link>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {loading ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          </div>

          {/* Botão Menu Mobile */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/dashboard'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/campanhas"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname.startsWith('/campanhas')
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Campanhas
              </Link>
              {user?.tipo === 'INSTITUICAO' && (
                <Link
                  href="/minhas-campanhas"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/minhas-campanhas'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Minhas Campanhas
                </Link>
              )}
              <Link
                href="/minhas-doacoes"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === '/minhas-doacoes'
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Minhas Doações
              </Link>
              <Link
                href="/perfil"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Meu Perfil
              </Link>
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  handleLogout()
                }}
                disabled={loading}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-900"
              >
                {loading ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
} 