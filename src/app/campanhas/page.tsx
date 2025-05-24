'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ItemNecessario {
  id: string
  nome: string
  descricao?: string
}

interface PontoColeta {
  id: string
  nome: string
  endereco: string
  horario: string
}

interface Campanha {
  id: string
  titulo: string
  descricao: string
  localizacao: string
  data_inicio: string
  data_fim: string
  tipo: 'VAQUINHA' | 'ALIMENTE' | 'ROUPA'
  busca_doacoes: boolean
  status: 'AGUARDANDO' | 'ATIVA' | 'ENCERRADA'
  instituicao: {
    id: string
    nome: string
    email: string
  }
  itens_necessarios: ItemNecessario[]
  pontos_coleta: PontoColeta[]
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
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {campanha.titulo}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {campanha.instituicao.nome}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    campanha.status === 'ATIVA'
                      ? 'bg-green-100 text-green-800'
                      : campanha.status === 'AGUARDANDO'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {campanha.status === 'ATIVA'
                      ? 'Ativa'
                      : campanha.status === 'AGUARDANDO'
                        ? 'Aguardando'
                        : 'Encerrada'}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {campanha.tipo === 'VAQUINHA'
                      ? 'Vaquinha'
                      : campanha.tipo === 'ALIMENTE'
                        ? 'Alimente'
                        : 'Roupa'}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-500 line-clamp-2">
                  {campanha.descricao}
                </p>

                {campanha.tipo !== 'VAQUINHA' && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Itens Necessários
                    </h4>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {campanha.itens_necessarios.map((item) => (
                          <span
                            key={item.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {item.nome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {campanha.localizacao}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(campanha.data_inicio).toLocaleDateString()} até{' '}
                    {new Date(campanha.data_fim).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-4">
                  <Link
                    href={`/campanhas/${campanha.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ver Detalhes
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