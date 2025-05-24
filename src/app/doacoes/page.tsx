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
    tipo: string
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
        const response = await fetch('/api/doacoes/minhas') 
        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          throw new Error('Falha ao buscar doações')
        }
        const data = await response.json()
        setDoacoes(data.doacoes || [])
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
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">Carregando suas doações...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <p className="text-red-600 text-center">{error}</p>
          <div className="mt-4 text-center">
            <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-500">
              Voltar para o Dashboard
            </Link>
          </div>
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
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma doação encontrada</h3>
          <p className="mt-1 text-sm text-gray-500">
            Você ainda não fez nenhuma doação. Que tal encontrar uma campanha para ajudar?
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {doacoes.map((doacao) => (
              <li key={doacao.id}>
                <Link href={`/campanhas/${doacao.campanha.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-md font-semibold text-indigo-600 truncate">
                        {doacao.campanha.titulo}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doacao.campanha.tipo === 'VAQUINHA' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                          {doacao.campanha.tipo === 'VAQUINHA' ? 'Vaquinha' : doacao.campanha.tipo === 'ALIMENTE' ? 'Alimentos' : 'Roupas'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {doacao.descricao}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <p>
                          Doado em <time dateTime={doacao.data_doacao}>{new Date(doacao.data_doacao).toLocaleDateString()}</time>
                        </p>
                      </div>
                    </div>
                    {(doacao.valor || doacao.quantidade) && (
                       <div className="mt-2 text-sm font-medium text-gray-700">
                        {doacao.valor && <p>Valor: R$ {doacao.valor.toFixed(2)}</p>}
                        {doacao.quantidade && <p>Quantidade: {doacao.quantidade}</p>}
                      </div>
                    )}
                    {doacao.foto_url && (
                      <div className="mt-2">
                        <img src={doacao.foto_url} alt="Foto da doação" className="h-20 w-auto rounded-md"/>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 