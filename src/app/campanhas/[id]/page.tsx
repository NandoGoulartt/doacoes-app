'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
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
    tipo: 'DOADOR' | 'INSTITUICAO'
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
  const [showShareModal, setShowShareModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

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

  async function handleShare() {
    const shareUrl = window.location.href
    const shareTitle = campanha?.titulo || 'Campanha de Doação'
    const shareText = `Ajude nesta campanha de doação: ${campanha?.titulo}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        })
      } catch {
        setShowShareModal(true)
      }
    } else {
      setShowShareModal(true)
    }
  }

  async function handleCopyLink() {
    const shareUrl = window.location.href
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar link:', err)
    }
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
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {campanha.titulo}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Detalhes da campanha e formulário de doação
                </p>
              </div>
              <button
                onClick={handleShare}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Compartilhar
              </button>
            </div>
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
                      {campanha.itens_necessarios.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">Nenhum item necessário cadastrado</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {campanha.itens_necessarios.map((item) => (
                            <div
                              key={item.id}
                              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
                            >
                              <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                  <h3 className="text-sm font-medium text-gray-900">{item.nome}</h3>
                                </div>
                                {item.descricao && (
                                  <p className="mt-1 text-sm text-gray-500">{item.descricao}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Pontos de Coleta</dt>
                    <dd className="mt-2">
                      {campanha.pontos_coleta.length === 0 ? (
                        <p className="text-sm text-gray-500 italic">Nenhum ponto de coleta cadastrado</p>
                      ) : (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {campanha.pontos_coleta.map((ponto) => (
                            <div
                              key={ponto.id}
                              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
                            >
                              <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900">{ponto.nome}</h3>
                                <div className="mt-2 space-y-1">
                                  <p className="text-sm text-gray-500">
                                    <span className="font-medium">Endereço:</span> {ponto.endereco}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    <span className="font-medium">Horário:</span> {ponto.horario}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
                          R$ {estatisticas.totalDoacoes.toFixed(2)}
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
                    className="block w-full px-3 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition duration-150 ease-in-out sm:text-sm appearance-none bg-white"
                    placeholder="Descreva sua doação..."
                  />
                </div>
                <div>
                  <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                    Valor
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input
                      type="number"
                      id="valor"
                      name="valor"
                      required
                      min="1"
                      step="0.01"
                      value={formData.valor}
                      onChange={handleInputChange}
                      className="block w-full pl-8 pr-3 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition duration-150 ease-in-out sm:text-sm appearance-none bg-white"
                      placeholder="0,00"
                    />
                  </div>
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
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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
                      <div className="flex items-center space-x-2">
                        <h5 className="text-sm font-medium text-gray-900">
                          {doacao.doador.nome}
                        </h5>
                        {doacao.doador.tipo === 'INSTITUICAO' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            Instituição
                          </span>
                        )}
                      </div>
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

        {showShareModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">Compartilhar Campanha</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={handleCopyLink}
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {copySuccess ? (
                      <>
                        <svg className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Link Copiado!
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copiar Link
                      </>
                    )}
                  </button>

                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Ajude nesta campanha de doação: ${campanha.titulo} ${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Compartilhar no WhatsApp
                  </a>

                  <a
                    href={`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Ajude nesta campanha de doação: ${campanha.titulo}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.347.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                    Compartilhar no Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

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