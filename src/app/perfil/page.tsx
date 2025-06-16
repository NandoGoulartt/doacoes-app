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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-indigo-600">
          <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Carregando perfil...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-xl rounded-lg p-8">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="mt-2 text-xl font-semibold text-gray-900">Acesso Necessário</h2>
            <p className="mt-2 text-gray-600">
              {error || 'Por favor, faça login para acessar seu perfil.'}
            </p>
          </div>
          <div className="mt-6">
            <Link
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ir para Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Cabeçalho do Perfil */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-white/30 flex items-center justify-center">
                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">Meu Perfil</h1>
                <p className="text-indigo-200 mt-1">Gerencie suas informações pessoais</p>
              </div>
            </div>
          </div>

          {/* Conteúdo do Perfil */}
          <div className="p-6 space-y-6">
            {/* Email */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            {/* Nome */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {isEditing ? (
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editableNome}
                      onChange={(e) => setEditableNome(e.target.value)}
                      className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white"
                    />
                  </div>
                ) : (
                  <div className="flex flex-1 items-center justify-between">
                    <input
                      type="text"
                      value={user.nome}
                      disabled
                      className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                    />
                    <button
                      onClick={handleEditToggle}
                      className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Editar
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Tipo de Conta */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Conta
              </label>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <input
                  type="text"
                  value={user.tipo === 'DOADOR' ? 'Doador' : 'Instituição'}
                  disabled
                  className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Barra de Ações */}
          {isEditing && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleEditToggle}
                  disabled={saveLoading}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={saveLoading || editableNome.trim() === '' || editableNome.trim() === user.nome}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saveLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Salvando...
                    </>
                  ) : (
                    'Salvar Alterações'
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 