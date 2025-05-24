'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">DoAção</span>
            </Link>
          </div>
          <div className="ml-10 hidden space-x-8 md:flex">
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
          </div>
          <div className="flex items-center">
            <Link
              href="/perfil"
              className="ml-8 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Meu Perfil
            </Link>
          </div>
        </div>
        
        {/* Menu mobile */}
        <div className="flex flex-wrap justify-center space-x-6 py-4 md:hidden">
          <Link
            href="/dashboard"
            className={`text-sm font-medium ${
              pathname === '/dashboard'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/campanhas"
            className={`text-sm font-medium ${
              pathname.startsWith('/campanhas')
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Campanhas
          </Link>
          <Link
            href="/minhas-doacoes"
            className={`text-sm font-medium ${
              pathname === '/minhas-doacoes'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Minhas Doações
          </Link>
        </div>
      </nav>
    </header>
  )
} 