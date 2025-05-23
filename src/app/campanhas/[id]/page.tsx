'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

interface Doacao {
  id: string
  descricao: string
  quantidade: number
  foto_url?: string
  data_doacao: string
  doador: {
    id: string
    nome: string
  }
}

export default function CampanhaPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [campanha, setCampanha] = useState<Campanha | null>(null)
  const [doacoes, setDoacoes] = useState<Doacao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    descricao: '',
    quantidade: '',
    foto_url: '',
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    loadCampanha()
  }, [params.id])

  async function loadCampanha() {
    try {
      const response = await fetch(`/api/campanhas/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar campanha')
      }

      setCampanha(data.campanha)
      setDoacoes(data.doacoes || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar campanha')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    setFormLoading(true)

    try {
      const response = await fetch('/api/doacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quantidade: parseInt(formData.quantidade),
          campanha_id: params.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer doação')
      }

      setFormData({
        descricao: '',
        quantidade: '',
        foto_url: '',
      })
      loadCampanha()
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
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-medium text-gray-900">Fazer uma doação</h4>
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
              <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
                Quantidade
              </label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                required
                min="1"
                value={formData.quantidade}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="foto_url" className="block text-sm font-medium text-gray-700">
                URL da Foto (opcional)
              </label>
              <input
                type="url"
                id="foto_url"
                name="foto_url"
                value={formData.foto_url}
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
        </div>

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
                      <p className="mt-1 text-sm text-gray-500">
                        Quantidade: {doacao.quantidade}
                      </p>
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
      </div>
    </div>
  )
} 