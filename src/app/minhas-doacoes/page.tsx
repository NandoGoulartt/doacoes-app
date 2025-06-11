'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Doacao {
  id: string
  descricao: string
  quantidade?: number
  valor?: number
  foto_url?: string
  data_doacao: string
  campanha: {
    id: string
    titulo: string
    descricao: string
    tipo: 'VAQUINHA' | 'ALIMENTE' | 'ROUPA'
    instituicao: {
      id: string
      nome: string
      email: string
      tipo: 'DOADOR' | 'INSTITUICAO'
    }
  }
}

export default function MinhasDoacoesPage() {
  const router = useRouter()
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDoacoes() {
      try {
        const response = await fetch('/api/doacoes')
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error('Falha ao buscar doações')
        }
        const data = await response.json()
        setDoacoes(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro')
      } finally {
        setLoading(false)
      }
    }
    fetchDoacoes()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando suas doações...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Minhas Doações</h1>
        <Link 
          href="/campanhas"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Ver Campanhas Abertas
        </Link>
      </div>

      {doacoes.length === 0 ? (
        <div className="text-center bg-white shadow-lg rounded-lg p-10">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma doação encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Você ainda não fez nenhuma doação. Que tal encontrar uma campanha para ajudar?
          </p>
          <div className="mt-6">
            <Link
              href="/campanhas"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ver Campanhas
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg divide-y divide-gray-200">
          {doacoes.map((doacao) => (
            <div key={doacao.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-lg font-medium text-gray-900">
                          {doacao.campanha.titulo}
                        </h4>
                        {doacao.campanha.instituicao.tipo === 'INSTITUICAO' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Instituição
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      doacao.campanha.tipo === 'VAQUINHA' 
                        ? 'bg-green-100 text-green-800'
                        : doacao.campanha.tipo === 'ALIMENTE'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {doacao.campanha.tipo === 'VAQUINHA' 
                        ? 'Vaquinha' 
                        : doacao.campanha.tipo === 'ALIMENTE'
                        ? 'Alimentos'
                        : 'Roupas'
                      }
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{doacao.descricao}</p>
                  <div className="mt-2 space-y-1">
                    {doacao.valor && (
                      <p className="text-sm text-gray-500">
                        Valor: R$ {doacao.valor.toFixed(2)}
                      </p>
                    )}
                    {doacao.quantidade && (
                      <p className="text-sm text-gray-500">
                        Quantidade: {doacao.quantidade}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      Data: {new Date(doacao.data_doacao).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Instituição: {doacao.campanha.instituicao.nome}
                    </p>
                  </div>
                </div>
                {doacao.foto_url && (
                  <div className="ml-4">
                    <img
                      src={doacao.foto_url}
                      alt="Foto da doação"
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link
                  href={`/campanhas/${doacao.campanha.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Ver campanha
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 