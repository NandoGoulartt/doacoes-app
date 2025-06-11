'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  nome: string
  email: string
  tipo: 'DOADOR' | 'INSTITUICAO'
}

export default function PerfilPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editableNome, setEditableNome] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      setError(null)
      let responseTextForDebug = ''
      try {
        const response = await fetch('/api/auth/me')
        responseTextForDebug = await response.text()

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login')
            return
          }
          let errorDetail = 'Falha ao buscar dados do usuário'
          try {
            const errorData = JSON.parse(responseTextForDebug)
            errorDetail = errorData.error || errorData.message || errorDetail
          } catch {
            errorDetail = responseTextForDebug.substring(0, 200) || errorDetail
          }
          throw new Error(errorDetail)
        }
        
        const data = JSON.parse(responseTextForDebug)
        if (data && data.user) {
          setUser(data.user)
          setEditableNome(data.user.nome || '')
        } else {
          throw new Error('Dados do usuário não encontrados na resposta da API.')
        }
      } catch (err) {
        console.error('Erro ao buscar usuário:', err, 'Resposta da API:', responseTextForDebug)
        setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os dados do usuário.')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  async function handleSaveChanges() {
    if (!user) return
    setSaveLoading(true)
    setError(null)
    let responseTextForDebug = ''
    try {
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: editableNome }),
      })
      responseTextForDebug = await response.text()

      if (!response.ok) {
        let errorDetail = 'Falha ao atualizar o perfil'
        try {
          const errorData = JSON.parse(responseTextForDebug)
          errorDetail = errorData.error || errorData.message || errorDetail
        } catch {
          errorDetail = responseTextForDebug.substring(0,200) || errorDetail
        }
        throw new Error(errorDetail)
      }

      if (response.status === 204 || responseTextForDebug.length === 0) {
        setUser(prevUser => prevUser ? { ...prevUser, nome: editableNome } : null)
      } else {
        const updatedUserData = JSON.parse(responseTextForDebug)
        if (updatedUserData && updatedUserData.user) {
          setUser(updatedUserData.user)
        } else {
          setUser(prevUser => prevUser ? { ...prevUser, nome: editableNome } : null)
        }
      }
      setIsEditing(false)
    } catch (err) {
      console.error('Erro ao salvar alterações:', err, 'Resposta da API:', responseTextForDebug)
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao salvar')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleEditToggle = () => {
    if (user) {
      setEditableNome(user.nome)
      setIsEditing(!isEditing)
      setError(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando perfil...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <p className="text-gray-700 text-center">
            {error || 'Usuário não autenticado ou falha ao carregar. Por favor, tente fazer login novamente.'}
          </p>
          <div className="mt-4 text-center">
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
              Ir para Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error && !isEditing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
          <p className="text-red-600 text-center">{error}</p>
          <div className="mt-4 text-center">
            <Link href="/perfil" className="text-indigo-600 hover:text-indigo-500">
              Tentar Novamente
            </Link>
            <span className="mx-2">|</span>
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
              Ir para Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Meu Perfil</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Gerencie suas informações pessoais.</p>
          </div>
          <div className="mt-5 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  disabled
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <div className="mt-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={editableNome}
                    onChange={(e) => setEditableNome(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      value={user.nome}
                      disabled
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                    />
                    <button
                      onClick={handleEditToggle}
                      className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Conta
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={user.tipo === 'DOADOR' ? 'Doador' : 'Instituição'}
                  disabled
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50 flex flex-col items-end">
            <div className="w-full flex justify-end space-x-3">
              <button
                onClick={handleEditToggle}
                disabled={saveLoading}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={saveLoading || editableNome.trim() === '' || editableNome.trim() === user.nome}
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saveLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
            {error && <p className="text-sm text-red-600 mt-2 self-start w-full text-left">Erro: {error}</p>}
          </div>
        )}
      </div>
    </div>
  )
} 