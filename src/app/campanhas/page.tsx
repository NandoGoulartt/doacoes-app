'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface PontoColeta {
  id: string
  nome: string
  endereco: string
  horario: string
}

interface ItemNecessario {
  id: string
  nome: string
  descricao?: string
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
  const [campanhasFiltradas, setCampanhasFiltradas] = useState<Campanha[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtros, setFiltros] = useState({
    titulo: '',
    tipo: '',
    data_inicio: '',
    data_fim: '',
    status: 'ATIVA'
  })

  useEffect(() => {
    loadCampanhas()
  }, [])

  useEffect(() => {
    filtrarCampanhas()
  }, [campanhas, filtros])

  async function loadCampanhas() {
    try {
      const response = await fetch('/api/campanhas')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar campanhas')
      }

      setCampanhas(data)
      setCampanhasFiltradas(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar campanhas')
    } finally {
      setLoading(false)
    }
  }

  function handleFiltroChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setFiltros(prev => ({ ...prev, [name]: value }))
  }

  function filtrarCampanhas() {
    let campanhasFiltradas = [...campanhas]

    if (filtros.titulo) {
      campanhasFiltradas = campanhasFiltradas.filter(campanha =>
        campanha.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())
      )
    }

    if (filtros.tipo) {
      campanhasFiltradas = campanhasFiltradas.filter(campanha =>
        campanha.tipo === filtros.tipo
      )
    }

    if (filtros.data_inicio) {
      campanhasFiltradas = campanhasFiltradas.filter(campanha =>
        new Date(campanha.data_inicio) >= new Date(filtros.data_inicio)
      )
    }

    if (filtros.data_fim) {
      campanhasFiltradas = campanhasFiltradas.filter(campanha =>
        new Date(campanha.data_fim) <= new Date(filtros.data_fim)
      )
    }

    if (filtros.status && filtros.status !== 'TODAS') {
      campanhasFiltradas = campanhasFiltradas.filter(campanha =>
        campanha.status === filtros.status
      )
    }

    setCampanhasFiltradas(campanhasFiltradas)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-indigo-600">
          <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Carregando campanhas...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Campanhas de Doação
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Encontre campanhas e faça a diferença na vida de quem precisa
          </p>
        </div>

        <div className="mt-10 bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative col-span-1 md:col-span-2 lg:col-span-1">
              <div className="flex items-center bg-white rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                <div className="pl-3">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  value={filtros.titulo}
                  onChange={handleFiltroChange}
                  placeholder="Buscar por nome da campanha"
                  className="block w-full pl-2 pr-3 py-2 text-base border-0 focus:outline-none focus:ring-0 sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select
                  name="status"
                  id="status"
                  value={filtros.status}
                  onChange={handleFiltroChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm"
                >
                  <option value="TODAS">📊 Todas</option>
                  <option value="ATIVA">✅ Ativas</option>
                  <option value="ENCERRADA">🔒 Encerradas</option>
                </select>
              </div>

              <div className="relative">
                <select
                  name="tipo"
                  id="tipo"
                  value={filtros.tipo}
                  onChange={handleFiltroChange}
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm"
                >
                  <option value="">📦 Todos os tipos</option>
                  <option value="VAQUINHA">💰 Vaquinha</option>
                  <option value="ALIMENTE">🥫 Alimento</option>
                  <option value="ROUPA">👕 Roupa</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="date"
                  name="data_inicio"
                  id="data_inicio"
                  value={filtros.data_inicio}
                  onChange={handleFiltroChange}
                  placeholder="Data Início"
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm"
                />
              </div>

              <div className="relative">
                <input
                  type="date"
                  name="data_fim"
                  id="data_fim"
                  value={filtros.data_fim}
                  onChange={handleFiltroChange}
                  placeholder="Data Fim"
                  className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-8 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Erro ao carregar campanhas
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {campanhasFiltradas.map((campanha) => (
            <div
              key={campanha.id}
              className="bg-white overflow-hidden shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {campanha.titulo}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center">
                      <svg className="h-4 w-4 text-gray-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    campanha.tipo === 'VAQUINHA'
                      ? 'bg-purple-100 text-purple-800'
                      : campanha.tipo === 'ALIMENTE'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {campanha.tipo === 'VAQUINHA'
                      ? '💰 Vaquinha'
                      : campanha.tipo === 'ALIMENTE'
                        ? '🥫 Alimento'
                        : '👕 Roupa'}
                  </span>
                </div>

                <p className="mt-4 text-sm text-gray-500 line-clamp-2">
                  {campanha.descricao}
                </p>

                <div className="mt-4 space-y-2">
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
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {new Date(campanha.data_inicio).toLocaleDateString()} até{' '}
                    {new Date(campanha.data_fim).toLocaleDateString()}
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/campanhas/${campanha.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    Ver Detalhes
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {campanhasFiltradas.length === 0 && !error && (
          <div className="mt-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma campanha encontrada</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tente ajustar os filtros para encontrar mais campanhas.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 