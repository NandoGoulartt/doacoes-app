'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
}

export default function MinhasCampanhasPage() {
  const router = useRouter()
  const [campanhas, setCampanhas] = useState<Campanha[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadCampanhas() {
      try {
        const response = await fetch('/api/campanhas/minhas')
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error('Falha ao carregar campanhas')
        }
        const data = await response.json()
        setCampanhas(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocorreu um erro')
      } finally {
        setLoading(false)
      }
    }
    loadCampanhas()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando suas campanhas...</div>
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
        <h1 className="text-3xl font-bold text-gray-900">Minhas Campanhas</h1>
        <Link 
          href="/campanhas/nova"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Nova Campanha
        </Link>
      </div>

      {campanhas.length === 0 ? (
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
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma campanha encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Você ainda não tem campanhas cadastradas. Que tal criar uma nova campanha?
          </p>
          <div className="mt-6">
            <Link
              href="/campanhas/nova"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Criar Campanha
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {campanhas.map((campanha) => (
            <div
              key={campanha.id}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-medium text-gray-900">
                    {campanha.titulo}
                  </h4>
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
                <p className="mt-2 text-sm text-gray-500">
                  {campanha.descricao}
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {campanha.localizacao}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(campanha.data_inicio).toLocaleDateString()} até {new Date(campanha.data_fim).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="h-5 w-5 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {campanha.tipo === 'VAQUINHA' 
                      ? 'Vaquinha' 
                      : campanha.tipo === 'ALIMENTE'
                        ? 'Alimentos'
                        : 'Roupas'
                    }
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
      )}
    </div>
  )
} 