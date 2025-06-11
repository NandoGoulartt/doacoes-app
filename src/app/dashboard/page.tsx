'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface User {
  id: string
  nome: string
  email: string
  tipo: 'DOADOR' | 'INSTITUICAO'
}

interface Estatisticas {
  total_doacoes: number
  total_campanhas: number
  doacoes_mes_atual: number
  campanhas_ativas: number
  impacto_social: number
}

interface CampanhaRecente {
  id: string
  titulo: string
  tipo: 'VAQUINHA' | 'ALIMENTE' | 'ROUPA'
  status: 'AGUARDANDO' | 'ATIVA' | 'ENCERRADA'
  data_inicio: string
  instituicao: {
    nome: string
  }
}

interface DoacaoRecente {
  id: string
  descricao: string
  data_doacao: string
  campanha: {
    titulo: string
    instituicao: {
      nome: string
    }
  }
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null)
  const [campanhasRecentes, setCampanhasRecentes] = useState<CampanhaRecente[]>([])
  const [doacoesRecentes, setDoacoesRecentes] = useState<DoacaoRecente[]>([])
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
      loadEstatisticas()
      loadRecentes()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  async function loadEstatisticas() {
    try {
      const response = await fetch('/api/estatisticas')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar estatísticas')
      }

      setEstatisticas(data)
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
      setError('Falha ao carregar estatísticas. Por favor, tente novamente.')
    }
  }

  async function loadRecentes() {
    try {
      const [campanhasResponse, doacoesResponse] = await Promise.all([
        fetch('/api/campanhas/recentes'),
        fetch('/api/doacoes/recentes')
      ])

      const [campanhasData, doacoesData] = await Promise.all([
        campanhasResponse.json(),
        doacoesResponse.json()
      ])

      if (campanhasResponse.ok) {
        setCampanhasRecentes(campanhasData)
      } else {
        console.error('Erro ao carregar campanhas:', campanhasData.error)
      }

      if (doacoesResponse.ok) {
        setDoacoesRecentes(doacoesData)
      } else {
        console.error('Erro ao carregar doações:', doacoesData.error)
      }
    } catch (error) {
      console.error('Erro ao carregar dados recentes:', error)
      setError('Falha ao carregar dados recentes. Por favor, tente novamente.')
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
        {/* Cabeçalho com Boas-vindas */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Olá, {user.nome}! 👋
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {user.tipo === 'INSTITUICAO' 
              ? 'Veja o impacto das suas campanhas e gerencie suas ações sociais'
              : 'Acompanhe suas contribuições e descubra novas formas de ajudar'}
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {user.tipo === 'INSTITUICAO' ? 'Total de Campanhas' : 'Total de Doações'}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {user.tipo === 'INSTITUICAO' 
                        ? estatisticas?.total_campanhas || 0
                        : estatisticas?.total_doacoes || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {user.tipo === 'INSTITUICAO' ? 'Campanhas Ativas' : 'Doações este mês'}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {user.tipo === 'INSTITUICAO'
                        ? estatisticas?.campanhas_ativas || 0
                        : estatisticas?.doacoes_mes_atual || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Impacto Social
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {estatisticas?.impacto_social || 0}
                      <span className="text-sm font-normal text-gray-500 ml-1">pessoas</span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-white truncate">
                      {user.tipo === 'INSTITUICAO' ? 'Doações Recebidas' : 'Campanhas Apoiadas'}
                    </dt>
                    <dd className="text-2xl font-semibold text-white">
                      {user.tipo === 'INSTITUICAO'
                        ? estatisticas?.total_doacoes || 0
                        : estatisticas?.total_campanhas || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Atividades Recentes */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Campanhas Recentes */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Campanhas Recentes</h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {campanhasRecentes.map((campanha) => (
                    <li key={campanha.id} className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                        <h4 className="text-sm font-semibold text-gray-800">
                          <Link href={`/campanhas/${campanha.id}`} className="hover:underline focus:outline-none">
                            {campanha.titulo}
                          </Link>
                        </h4>
                        <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                          <span>{campanha.instituicao.nome}</span>
                          <span>•</span>
                          <span>{new Date(campanha.data_inicio).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campanha.status === 'ATIVA'
                              ? 'bg-green-100 text-green-800'
                              : campanha.status === 'AGUARDANDO'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {campanha.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {campanhasRecentes.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhuma campanha recente
                  </p>
                )}
              </div>
              <div className="mt-6">
                <Link
                  href="/campanhas"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Ver todas as campanhas
                </Link>
              </div>
            </div>
          </div>

          {/* Doações Recentes */}
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Doações Recentes</h3>
              <div className="mt-6 flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {doacoesRecentes.map((doacao) => (
                    <li key={doacao.id} className="py-5">
                      <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                        <h4 className="text-sm font-semibold text-gray-800">
                          <Link href={`/campanhas/${doacao.campanha.titulo}`} className="hover:underline focus:outline-none">
                            {doacao.campanha.titulo}
                          </Link>
                        </h4>
                        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{doacao.descricao}</p>
                        <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                          <span>{doacao.campanha.instituicao.nome}</span>
                          <span>•</span>
                          <span>{new Date(doacao.data_doacao).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {doacoesRecentes.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhuma doação recente
                  </p>
                )}
              </div>
              <div className="mt-6">
                <Link
                  href="/minhas-doacoes"
                  className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Ver todas as doações
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Dicas e Sugestões */}
        <div className="mt-8">
          <div className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg overflow-hidden">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">
                  {user.tipo === 'INSTITUICAO'
                    ? 'Dicas para Aumentar o Impacto'
                    : 'Como Ajudar Mais'}
                </h3>
                <div className="ml-4 bg-white bg-opacity-20 rounded-full p-2">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4 text-white text-opacity-90">
                <ul className="space-y-3">
                  {user.tipo === 'INSTITUICAO' ? (
                    <>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mantenha suas campanhas atualizadas com fotos e descrições detalhadas
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Compartilhe histórias de sucesso e o impacto das doações
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Interaja com os doadores e agradeça cada contribuição
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Compartilhe campanhas com amigos e familiares
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Configure lembretes para doações regulares
                      </li>
                      <li className="flex items-start">
                        <svg className="h-6 w-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Acompanhe o impacto das suas contribuições
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 