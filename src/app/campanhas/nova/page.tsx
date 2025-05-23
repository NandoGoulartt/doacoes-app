'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NovaCampanhaPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      titulo: formData.get('titulo'),
      descricao: formData.get('descricao'),
      localizacao: formData.get('localizacao'),
      data_inicio: formData.get('data_inicio'),
      data_fim: formData.get('data_fim'),
    }

    try {
      const response = await fetch('/api/campanhas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar campanha')
      }

      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao criar campanha')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Voltar para Dashboard
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Nova Campanha
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Preencha os dados abaixo para criar uma nova campanha de doação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="titulo" className="sr-only">
                Título
              </label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Título da campanha"
              />
            </div>
            <div>
              <label htmlFor="descricao" className="sr-only">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={4}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Descrição detalhada da campanha"
              />
            </div>
            <div>
              <label htmlFor="localizacao" className="sr-only">
                Localização
              </label>
              <input
                id="localizacao"
                name="localizacao"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Localização"
              />
            </div>
            <div>
              <label htmlFor="data_inicio" className="sr-only">
                Data de Início
              </label>
              <input
                id="data_inicio"
                name="data_inicio"
                type="date"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="data_fim" className="sr-only">
                Data de Fim
              </label>
              <input
                id="data_fim"
                name="data_fim"
                type="date"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Campanha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 