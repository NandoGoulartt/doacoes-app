'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface User {
  id: string
  nome: string
  email: string
  tipo: 'DOADOR' | 'INSTITUICAO'
}

interface Campanha {
  id: string
  titulo: string
  descricao: string
  localizacao: string
  data_inicio: string
  data_fim: string
  status: 'AGUARDANDO' | 'ATIVA' | 'ENCERRADA'
  instituicao: {
    id: string
    nome: string
    email: string
  }
}

interface Doacao {
  id: string
  descricao: string
  quantidade: number
  foto_url?: string
  data_doacao: string
  campanha: {
    id: string
    titulo: string
    descricao: string
    instituicao: {
      id: string
      nome: string
      email: string
    }
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [campanhas, setCampanhas] = useState<Campanha[]>([])
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [campanhasAtivas, setCampanhasAtivas] = useState<Campanha[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUserData()
  }, [])

  async function loadUserData() {
    try {
      const response = await fetch('/api/auth/me')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar dados do usuário')
      }

      setUser(data.user)

      if (data.user.tipo === 'INSTITUICAO') {
        loadCampanhas()
      } else {
        loadDoacoes()
        loadCampanhasAtivas()
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  async function loadCampanhas() {
    try {
      const response = await fetch('/api/campanhas/minhas')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar campanhas')
      }

      setCampanhas(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar campanhas')
    }
  }

  async function loadCampanhasAtivas() {
    try {
      const response = await fetch('/api/campanhas')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar campanhas')
      }

      setCampanhasAtivas(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar campanhas')
    }
  }

  async function loadDoacoes() {
    try {
      const response = await fetch('/api/doacoes')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar doações')
      }

      setDoacoes(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar doações')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              {error || 'Usuário não encontrado'}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Olá, {user.nome}
            </h2>
          </div>
          {user.tipo === 'INSTITUICAO' && (
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                href="/campanhas/nova"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Nova Campanha
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8">
          {user.tipo === 'INSTITUICAO' ? (
            <>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Minhas Campanhas
              </h3>
              <div className="mt-4 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {campanhas.map((campanha) => (
                  <div
                    key={campanha.id}
                    className="bg-white overflow-hidden shadow rounded-lg"
                  >
                    <div className="p-6">
                      <h4 className="text-lg font-medium text-gray-900">
                        {campanha.titulo}
                      </h4>
                      <p className="mt-2 text-sm text-gray-500">
                        {campanha.descricao}
                      </p>
                      <div className="mt-4">
                        <div className="text-sm text-gray-500">
                          📍 {campanha.localizacao}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          📅 {new Date(campanha.data_inicio).toLocaleDateString()} até{' '}
                          {new Date(campanha.data_fim).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="mt-6">
                        <Link
                          href={`/campanhas/${campanha.id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Ver detalhes
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {campanhas.length === 0 && (
                <p className="text-sm text-gray-500">
                  Você ainda não tem campanhas cadastradas
                </p>
              )}
            </>
          ) : (
            <>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Campanhas Disponíveis
                  </h3>
                  <div className="mt-4 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {campanhasAtivas.map((campanha) => (
                      <div
                        key={campanha.id}
                        className="bg-white overflow-hidden shadow rounded-lg"
                      >
                        <div className="p-6">
                          <h4 className="text-lg font-medium text-gray-900">
                            {campanha.titulo}
                          </h4>
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
                              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                                campanha.status === 'ATIVA'
                                  ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                                  : 'text-gray-500 bg-gray-100 cursor-not-allowed'
                              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                              aria-disabled={campanha.status !== 'ATIVA'}
                              onClick={e => {
                                if (campanha.status !== 'ATIVA') {
                                  e.preventDefault()
                                }
                              }}
                            >
                              {campanha.status === 'ATIVA' ? 'Fazer Doação' : 'Campanha Encerrada'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {campanhasAtivas.length === 0 && (
                    <p className="text-sm text-gray-500">
                      Nenhuma campanha disponível no momento
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Minhas Doações
                  </h3>
                  <div className="mt-4 space-y-4">
                    {doacoes.map((doacao) => (
                      <div
                        key={doacao.id}
                        className="bg-white shadow overflow-hidden sm:rounded-lg"
                      >
                        <div className="px-4 py-5 sm:p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-medium text-gray-900">
                                {doacao.campanha.titulo}
                              </h4>
                              <p className="mt-1 text-sm text-gray-500">
                                {doacao.descricao}
                              </p>
                              <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                  Quantidade: {doacao.quantidade}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Data: {new Date(doacao.data_doacao).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500">
                                  Instituição: {doacao.campanha.instituicao.nome}
                                </p>
                              </div>
                            </div>
                            {doacao.foto_url && (
                              <img
                                src={doacao.foto_url}
                                alt="Foto da doação"
                                className="h-20 w-20 object-cover rounded-md"
                              />
                            )}
                          </div>
                          <div className="mt-4">
                            <Link
                              href={`/campanhas/${doacao.campanha.id}`}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Ver campanha
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    {doacoes.length === 0 && (
                      <p className="text-sm text-gray-500">
                        Você ainda não fez nenhuma doação
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 