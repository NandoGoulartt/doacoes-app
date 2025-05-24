'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PixModal from '@/components/PixModal'

interface Instituicao {
  id: string
  nome: string
  email: string
}

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
  instituicao: Instituicao
  itens_necessarios: ItemNecessario[]
  pontos_coleta: PontoColeta[]
}

interface FormData {
  descricao: string
  valor?: string
  quantidade?: string
  foto_url: string
}

interface Doacao {
  id: string
  descricao: string
  quantidade?: number
  valor?: number
  foto_url?: string
  data_doacao: string
  doador: {
    id: string
    nome: string
  }
}

interface Estatisticas {
  totalDoacoes: number
  numeroDoacoes: number
}

export default function CampanhaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [campanha, setCampanha] = useState<Campanha | null>(null)
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [estatisticas, setEstatisticas] = useState<Estatisticas>({
    totalDoacoes: 0,
    numeroDoacoes: 0
  })
  const [formData, setFormData] = useState<FormData>({
    descricao: '',
    valor: '',
    quantidade: '',
    foto_url: '',
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [showPixModal, setShowPixModal] = useState(false)

  useEffect(() => {
    loadCampanha()
  }, [id])

  async function loadCampanha() {
    try {
      setLoading(true)
      const response = await fetch(`/api/campanhas/${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar campanha')
      }

      if (!data.campanha) {
        throw new Error('Dados da campanha não encontrados')
      }

      const campanha = {
        ...data.campanha,
        itens_necessarios: data.campanha.itens_necessarios || [],
        pontos_coleta: data.campanha.pontos_coleta || []
      }

      setCampanha(campanha)
      setDoacoes(data.doacoes || [])
      setEstatisticas({
        totalDoacoes: data.estatisticas?.totalDoacoes || 0,
        numeroDoacoes: data.estatisticas?.numeroDoacoes || 0
      })
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar campanha')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    if (campanha?.tipo === 'VAQUINHA') {
      setShowPixModal(true)
      return
    }

    await realizarDoacao()
  }

  async function realizarDoacao() {
    setFormLoading(true)

    try {
      const response = await fetch(`/api/campanhas/${id}/doacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descricao: formData.descricao,
          valor: formData.valor ? parseFloat(formData.valor) : undefined,
          quantidade: formData.quantidade ? parseInt(formData.quantidade) : undefined,
          foto_url: formData.foto_url || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer doação')
      }

      await loadCampanha()

      setFormData({
        descricao: '',
        valor: '',
        quantidade: '',
        foto_url: '',
      })
      setShowPixModal(false)
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Erro ao fazer doação')
    } finally {
      setFormLoading(false)
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">Carregando...</div>
      </div>
    )
  }

  if (error || !campanha) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">
              {error || 'Campanha não encontrada'}
            </div>
          </div>
          <button
            onClick={() => router.push('/campanhas')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Voltar para campanhas
          </button>
        </div>
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

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {campanha.titulo}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detalhes da campanha e formulário de doação
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    campanha.status === 'ATIVA'
                      ? 'bg-green-100 text-green-800'
                      : campanha.status === 'AGUARDANDO'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {campanha.status === 'ATIVA'
                      ? 'Campanha Ativa'
                      : campanha.status === 'AGUARDANDO'
                        ? 'Aguardando Início'
                        : 'Campanha Encerrada'}
                  </span>
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Tipo de Campanha</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {campanha.tipo === 'VAQUINHA'
                    ? 'Vaquinha (Doação em dinheiro)'
                    : campanha.tipo === 'ALIMENTE'
                      ? 'Alimente (Doação de alimentos)'
                      : 'Roupa (Doação de roupas)'}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                <dd className="mt-1 text-sm text-gray-900">{campanha.descricao}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Localização</dt>
                <dd className="mt-1 text-sm text-gray-900">{campanha.localizacao}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Instituição</dt>
                <dd className="mt-1 text-sm text-gray-900">{campanha.instituicao.nome}</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Data de Início</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(campanha.data_inicio).toLocaleDateString()}
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Data de Fim</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(campanha.data_fim).toLocaleDateString()}
                </dd>
              </div>

              {campanha.tipo !== 'VAQUINHA' && (
                <>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Busca Doações?</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {campanha.busca_doacoes ? 'Sim' : 'Não'}
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Itens Necessários</dt>
                    <dd className="mt-2">
                      <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                        {campanha.itens_necessarios.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                          >
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">
                                {item.nome}
                                {item.descricao && (
                                  <span className="text-gray-500"> - {item.descricao}</span>
                                )}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Pontos de Coleta</dt>
                    <dd className="mt-2">
                      <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                        {campanha.pontos_coleta.map((ponto) => (
                          <li
                            key={ponto.id}
                            className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                          >
                            <div className="flex w-0 flex-1 items-center">
                              <div className="ml-2 w-0 flex-1">
                                <p className="font-medium truncate">{ponto.nome}</p>
                                <p className="text-gray-500">{ponto.endereco}</p>
                                <p className="text-gray-500">Horário: {ponto.horario}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </>
              )}

              {campanha.tipo === 'VAQUINHA' && (
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Estatísticas</dt>
                  <dd className="mt-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-4">
                        <h4 className="text-sm font-medium text-gray-500 truncate">
                          Total de Doações
                        </h4>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">
                          {estatisticas.totalDoacoes}
                        </p>
                      </div>
                      <div className="bg-white overflow-hidden rounded-lg border border-gray-200 p-4">
                        <h4 className="text-sm font-medium text-gray-500 truncate">
                          Número de Doadores
                        </h4>
                        <p className="mt-1 text-3xl font-semibold text-gray-900">
                          {estatisticas.numeroDoacoes}
                        </p>
                      </div>
                    </div>
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        {campanha.tipo === 'VAQUINHA' ? (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900">Fazer uma doação</h4>
            {campanha.status !== 'ATIVA' ? (
              <div className="mt-4 rounded-md bg-yellow-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.485 2.495c.873-1.562 3.157-1.562 4.03 0l6.28 11.226c.875 1.562-.217 3.519-2.015 3.519H4.22c-1.798 0-2.89-1.957-2.015-3.519l6.28-11.226zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      {campanha.status === 'AGUARDANDO'
                        ? 'Esta campanha ainda não foi iniciada'
                        : 'Esta campanha já foi encerrada'}
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        {campanha.status === 'AGUARDANDO'
                          ? `A campanha iniciará em ${new Date(campanha.data_inicio).toLocaleDateString()}`
                          : `A campanha foi encerrada em ${new Date(campanha.data_fim).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows={3}
                    required
                    value={formData.descricao}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                    Valor
                  </label>
                  <input
                    type="number"
                    id="valor"
                    name="valor"
                    required
                    min="1"
                    step="0.01"
                    value={formData.valor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                {formError && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{formError}</div>
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    {formLoading ? 'Enviando...' : 'Fazer Doação'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900">Como doar</h4>
            <div className="mt-4 rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Como participar desta campanha
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      {campanha.busca_doacoes
                        ? 'A instituição irá buscar as doações em sua residência. Entre em contato para agendar.'
                        : 'Leve suas doações até um dos pontos de coleta listados acima.'}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="flex space-x-3">
                      <a
                        href={`mailto:${campanha.instituicao.email}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                      >
                        Entrar em contato
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900">Doações Recebidas</h4>
          <div className="mt-4 space-y-4">
            {doacoes.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhuma doação recebida ainda
              </p>
            ) : (
              doacoes.map((doacao) => (
                <div
                  key={doacao.id}
                  className="bg-white shadow overflow-hidden sm:rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">
                        {doacao.doador.nome}
                      </h5>
                      <p className="mt-1 text-sm text-gray-500">
                        {doacao.descricao}
                      </p>
                      {campanha.tipo === 'VAQUINHA' ? (
                        <p className="mt-1 text-sm text-gray-500">
                          Valor: R$ {doacao.valor?.toFixed(2)}
                        </p>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">
                          Quantidade: {doacao.quantidade}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        Data: {new Date(doacao.data_doacao).toLocaleDateString()}
                      </p>
                    </div>
                    {doacao.foto_url && (
                      <img
                        src={doacao.foto_url}
                        alt="Foto da doação"
                        className="h-20 w-20 object-cover rounded-md"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {campanha?.tipo === 'VAQUINHA' && showPixModal && (
          <PixModal
            isOpen={showPixModal}
            onClose={() => setShowPixModal(false)}
            valor={parseFloat(formData.valor || '0')}
            onPaymentComplete={realizarDoacao}
            campanha={campanha}
          />
        )}
      </div>
    </div>
  )
} 