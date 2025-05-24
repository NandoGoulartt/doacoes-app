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
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Nova Campanha</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Preencha os dados abaixo para criar uma nova campanha de doação
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo de Campanha
              </label>
              <div className="mt-1">
                <select
                  id="tipo"
                  name="tipo"
                  value={tipoCampanha}
                  onChange={(e) => setTipoCampanha(e.target.value as 'VAQUINHA' | 'ALIMENTE' | 'ROUPA')}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                >
                  <option value="VAQUINHA">Vaquinha (Doação em dinheiro)</option>
                  <option value="ALIMENTE">Alimente (Doação de alimentos)</option>
                  <option value="ROUPA">Roupa (Doação de roupas)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <div className="mt-1">
                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="Digite o título da campanha"
                />
              </div>
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <div className="mt-1">
                <textarea
                  id="descricao"
                  name="descricao"
                  rows={4}
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="Descreva os detalhes da sua campanha"
                />
              </div>
            </div>

            <div>
              <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
                Localização
              </label>
              <div className="mt-1">
                <input
                  id="localizacao"
                  name="localizacao"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  placeholder="Digite a localização da campanha"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="data_inicio" className="block text-sm font-medium text-gray-700">
                  Data de Início
                </label>
                <div className="mt-1">
                  <input
                    id="data_inicio"
                    name="data_inicio"
                    type="date"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="data_fim" className="block text-sm font-medium text-gray-700">
                  Data de Fim
                </label>
                <div className="mt-1">
                  <input
                    id="data_fim"
                    name="data_fim"
                    type="date"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                  />
                </div>
              </div>
            </div>

            {tipoCampanha !== 'VAQUINHA' && (
              <>
                <div className="border-t border-gray-200 pt-6">
                  <fieldset>
                    <legend className="text-base font-medium text-gray-900">Buscar doações?</legend>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          id="busca_sim"
                          name="busca_doacoes"
                          type="radio"
                          value="true"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label htmlFor="busca_sim" className="ml-3 block text-sm text-gray-700">
                          Sim, iremos buscar as doações
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="busca_nao"
                          name="busca_doacoes"
                          type="radio"
                          value="false"
                          defaultChecked
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label htmlFor="busca_nao" className="ml-3 block text-sm text-gray-700">
                          Não, apenas pontos de coleta
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Itens Necessários</h3>
                  <div className="mt-4 space-y-4">
                    {itensNecessarios.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.nome}</p>
                          {item.descricao && <p className="text-sm text-gray-500">{item.descricao}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => removerItem(index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <input
                        type="text"
                        value={novoItem.nome}
                        onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
                        placeholder="Nome do item"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      />
                      <input
                        type="text"
                        value={novoItem.descricao}
                        onChange={(e) => setNovoItem({ ...novoItem, descricao: e.target.value })}
                        placeholder="Descrição (opcional)"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={adicionarItem}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Adicionar Item
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900">Pontos de Coleta</h3>
                  <div className="mt-4 space-y-4">
                    {pontosColeta.map((ponto, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{ponto.nome}</p>
                          <p className="text-sm text-gray-500">{ponto.endereco}</p>
                          <p className="text-sm text-gray-500">Horário: {ponto.horario}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removerPonto(index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remover
                        </button>
                      </div>
                    ))}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <input
                        type="text"
                        value={novoPonto.nome}
                        onChange={(e) => setNovoPonto({ ...novoPonto, nome: e.target.value })}
                        placeholder="Nome do local"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      />
                      <input
                        type="text"
                        value={novoPonto.endereco}
                        onChange={(e) => setNovoPonto({ ...novoPonto, endereco: e.target.value })}
                        placeholder="Endereço"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      />
                      <input
                        type="text"
                        value={novoPonto.horario}
                        onChange={(e) => setNovoPonto({ ...novoPonto, horario: e.target.value })}
                        placeholder="Horário de funcionamento"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={adicionarPonto}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Adicionar Ponto de Coleta
                    </button>
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Link
                href="/campanhas"
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading || (tipoCampanha !== 'VAQUINHA' && (itensNecessarios.length === 0 || pontosColeta.length === 0))}
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Criando...' : 'Criar Campanha'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 