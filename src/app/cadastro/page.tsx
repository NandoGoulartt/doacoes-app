'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CadastroPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      senha: formData.get('senha'),
      tipo: formData.get('tipo'),
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao fazer cadastro')
      }

      router.push('/login')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao fazer cadastro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">DoAção</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Crie sua conta para começar
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1">
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo de Usuário
              </label>
              <div className="mt-1">
                <select
                  id="tipo"
                  name="tipo"
                  required
                  className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white"
                >
                  <option value="">Selecione o tipo de usuário</option>
                  <option value="DOADOR">Doador</option>
                  <option value="INSTITUICAO">Instituição</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Já tem uma conta?{' '}
                  <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Faça login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 