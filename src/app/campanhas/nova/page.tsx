'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ItemNecessario {
  nome: string
  descricao?: string
}

interface PontoColeta {
  nome: string
  endereco: string
  horario: string
}

export default function NovaCampanhaPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [tipoCampanha, setTipoCampanha] = useState<'VAQUINHA' | 'ALIMENTE' | 'ROUPA'>('VAQUINHA')
  const [itensNecessarios, setItensNecessarios] = useState<ItemNecessario[]>([])
  const [pontosColeta, setPontosColeta] = useState<PontoColeta[]>([])
  const [novoItem, setNovoItem] = useState({ nome: '', descricao: '' })
  const [novoPonto, setNovoPonto] = useState({ nome: '', endereco: '', horario: '' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const data = {
      titulo: formData.get('titulo'),
      descricao: formData.get('descricao'),
      localizacao: formData.get('localizacao'),
      data_inicio: formData.get('data_inicio'),
      data_fim: formData.get('data_fim'),
      tipo: tipoCampanha,
      busca_doacoes: tipoCampanha !== 'VAQUINHA' ? formData.get('busca_doacoes') === 'true' : false,
      itens_necessarios: tipoCampanha !== 'VAQUINHA' ? itensNecessarios : [],
      pontos_coleta: tipoCampanha !== 'VAQUINHA' ? pontosColeta : []
    }

    try {
      const response = await fetch('/api/campanhas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao criar campanha')
      }

      router.push('/dashboard')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao criar campanha')
    } finally {
      setLoading(false)
    }
  }

  function adicionarItem() {
    if (novoItem.nome.trim()) {
      setItensNecessarios([...itensNecessarios, { ...novoItem }])
      setNovoItem({ nome: '', descricao: '' })
    }
  }

  function removerItem(index: number) {
    setItensNecessarios(itensNecessarios.filter((_, i) => i !== index))
  }

  function adicionarPonto() {
    if (novoPonto.nome.trim() && novoPonto.endereco.trim() && novoPonto.horario.trim()) {
      setPontosColeta([...pontosColeta, { ...novoPonto }])
      setNovoPonto({ nome: '', endereco: '', horario: '' })
    }
  }

  function removerPonto(index: number) {
    setPontosColeta(pontosColeta.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ← Voltar para Dashboard
          </Link>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Nova Campanha
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Preencha os dados abaixo para criar uma nova campanha de doação
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo de Campanha
              </label>
              <select
                id="tipo"
                name="tipo"
                value={tipoCampanha}
                onChange={(e) => setTipoCampanha(e.target.value as 'VAQUINHA' | 'ALIMENTE' | 'ROUPA')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="VAQUINHA">Vaquinha (Doação em dinheiro)</option>
                <option value="ALIMENTE">Alimente (Doação de alimentos)</option>
                <option value="ROUPA">Roupa (Doação de roupas)</option>
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Título da campanha"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Descrição detalhada da campanha"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
                Localização
              </label>
              <input
                id="localizacao"
                name="localizacao"
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Localização"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="data_inicio" className="block text-sm font-medium text-gray-700">
                Data de Início
              </label>
              <input
                id="data_inicio"
                name="data_inicio"
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="data_fim" className="block text-sm font-medium text-gray-700">
                Data de Fim
              </label>
              <input
                id="data_fim"
                name="data_fim"
                type="date"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {tipoCampanha !== 'VAQUINHA' && (
              <>
                <div className="mt-6">
                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">Buscar doações?</legend>
                    <div className="mt-2 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="busca_sim"
                          name="busca_doacoes"
                          type="radio"
                          value="true"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="busca_sim" className="ml-3">
                          <span className="block text-sm font-medium text-gray-700">
                            Sim, iremos buscar as doações
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="busca_nao"
                          name="busca_doacoes"
                          type="radio"
                          value="false"
                          defaultChecked
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        />
                        <label htmlFor="busca_nao" className="ml-3">
                          <span className="block text-sm font-medium text-gray-700">
                            Não, apenas pontos de coleta
                          </span>
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Itens Necessários</h3>
                  <div className="mt-4 space-y-4">
                    {itensNecessarios.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.nome}</p>
                          {item.descricao && <p className="text-sm text-gray-500">{item.descricao}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removerItem(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={novoItem.nome}
                        onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
                        placeholder="Nome do item"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        value={novoItem.descricao}
                        onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })}
                        placeholder="Descrição (opcional)"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={adicionarItem}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Pontos de Coleta</h3>
                  <div className="mt-4 space-y-4">
                    {pontosColeta.map((ponto, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{ponto.nome}</p>
                          <p className="text-sm text-gray-500">{ponto.endereco}</p>
                          <p className="text-sm text-gray-500">Horário: {ponto.horario}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removerPonto(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={novoPonto.nome}
                        onChange={(e) => setNovoPonto({ ...novoPonto, nome: e.target.value })}
                        placeholder="Nome do local"
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        value={novoPonto.endereco}
                        onChange={(e) => setNovoPonto({ ...novoPonto, endereco: e.target.value })}
                        placeholder="Endereço"
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        value={novoPonto.horario}
                        onChange={(e) => setNovoPonto({ ...novoPonto, horario: e.target.value })}
                        placeholder="Horário de funcionamento"
                        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={adicionarPonto}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Adicionar Ponto de Coleta
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="mr-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || (tipoCampanha !== 'VAQUINHA' && (itensNecessarios.length === 0 || pontosColeta.length === 0))}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Campanha'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 