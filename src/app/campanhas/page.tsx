'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Instituicao {
  id: string
  nome: string
  email: string
}

interface Campanha {
  id: string
  titulo: string
  descricao: string
  localizacao: string
  data_inicio: string
  data_fim: string
  instituicao: Instituicao
}

export default function CampanhasPage() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtros, setFiltros] = useState({
    localizacao: '',
    data_inicio: '',
    data_fim: '',
  })

  useEffect(() => {
    loadCampanhas()
  }, [filtros])

  async function loadCampanhas() {
    try {
      const params = new URLSearchParams()
      if (filtros.localizacao) params.append('localizacao', filtros.localizacao)
      if (filtros.data_inicio) params.append('data_inicio', filtros.data_inicio)
      if (filtros.data_fim) params.append('data_fim', filtros.data_fim)

      const response = await fetch(`/api/campanhas?${params.toString()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar campanhas')
      }

      setCampanhas(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar campanhas')
    } finally {
      setLoading(false)
    }
  }

  function handleFiltroChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setFiltros(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Voltar para Dashboard
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Campanhas Ativas
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Encontre campanhas de doação próximas a você
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="localizacao"
            value={filtros.localizacao}
            onChange={handleFiltroChange}
            placeholder="Localização"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="date"
            name="data_inicio"
            value={filtros.data_inicio}
            onChange={handleFiltroChange}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <input
            type="date"
            name="data_fim"
            value={filtros.data_fim}
            onChange={handleFiltroChange}
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {error && (
          <div className="mt-8 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {campanhas.map((campanha) => (
            <div
              key={campanha.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {campanha.titulo}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {campanha.descricao}
                </p>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">
                    📍 {campanha.localizacao}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    👤 {campanha.instituicao.nome}
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    📅 {new Date(campanha.data_inicio).toLocaleDateString()} até{' '}
                    {new Date(campanha.data_fim).toLocaleDateString()}
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/campanhas/${campanha.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ver detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {campanhas.length === 0 && !error && (
          <div className="mt-8 text-center text-gray-500">
            Nenhuma campanha encontrada
          </div>
        )}
      </div>
    </div>
  )
} 