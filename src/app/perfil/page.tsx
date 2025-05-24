'use client'

import { useEffect, useState } from 'react'
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
      setLoading(true);
      setError(null);
      let responseTextForDebug = '';
      try {
        const response = await fetch('/api/auth/me');
        responseTextForDebug = await response.text(); 

        if (!response.ok) {
          if (response.status === 401) {
            router.push('/login');
            return;
          }
          let errorDetail = 'Falha ao buscar dados do usuário';
          try {
            const errorData = JSON.parse(responseTextForDebug);
            errorDetail = errorData.error || errorData.message || errorDetail;
          } catch {
            errorDetail = responseTextForDebug.substring(0, 200) || errorDetail;
          }
          throw new Error(errorDetail);
        }
        
        const data = JSON.parse(responseTextForDebug);
        if (data && data.user) {
            setUser(data.user);
            setEditableNome(data.user.nome || '');
        } else {
            throw new Error('Dados do usuário não encontrados na resposta da API.');
        }

      } catch (err) {
        console.error('Erro ao buscar usuário:', err, 'Resposta da API:', responseTextForDebug);
        setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar os dados do usuário.');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [router]);

  async function handleLogout() {
    let responseTextForDebug = '';
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      responseTextForDebug = await response.text();

      if (!response.ok) {
        let errorDetail = 'Falha ao fazer logout';
        try {
            const errorData = JSON.parse(responseTextForDebug);
            errorDetail = errorData.error || errorData.message || errorDetail;
        } catch {
            errorDetail = responseTextForDebug.substring(0,200) || errorDetail;
        }
        throw new Error(errorDetail);
      }
      router.push('/login');
    } catch (err) {
      console.error('Erro no logout:', err, 'Resposta da API:', responseTextForDebug);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao sair');
    }
  }

  async function handleSaveChanges() {
    if (!user) return;
    setSaveLoading(true);
    setError(null);
    let responseTextForDebug = '';
    try {
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: editableNome }),
      });
      responseTextForDebug = await response.text();

      if (!response.ok) {
        let errorDetail = 'Falha ao atualizar o perfil';
        try {
          const errorData = JSON.parse(responseTextForDebug);
          errorDetail = errorData.error || errorData.message || errorDetail;
        } catch {
          errorDetail = responseTextForDebug.substring(0,200) || errorDetail;
        }
        throw new Error(errorDetail);
      }

      if (response.status === 204 || responseTextForDebug.length === 0) {
        setUser(prevUser => prevUser ? { ...prevUser, nome: editableNome } : null);
      } else {
        const updatedUserData = JSON.parse(responseTextForDebug);
        if (updatedUserData && updatedUserData.user) {
          setUser(updatedUserData.user);
        } else {
          setUser(prevUser => prevUser ? { ...prevUser, nome: editableNome } : null);
        }
      }
      setIsEditing(false);
    } catch (err) {
      console.error('Erro ao salvar alterações:', err, 'Resposta da API:', responseTextForDebug);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao salvar');
    } finally {
      setSaveLoading(false);
    }
  }

  const handleEditToggle = () => {
    if (user) {
      setEditableNome(user.nome); 
      setIsEditing(!isEditing);
      setError(null); 
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Carregando perfil...</div>
      </div>
    );
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
    );
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
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-indigo-600 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Meu Perfil</h2>
          {!isEditing && (
            <button
              onClick={handleEditToggle}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Editar Perfil
            </button>
          )}
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Nome completo</dt>
              {isEditing ? (
                <dd className="mt-1 sm:mt-0 sm:col-span-2">
                  <input 
                    type="text" 
                    value={editableNome}
                    onChange={(e) => setEditableNome(e.target.value)}
                    className="text-sm text-gray-900 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 w-full"
                  />
                </dd>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.nome}</dd>
              )}
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Endereço de e-mail</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email} <span className="text-xs text-gray-400">(não editável)</span></dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tipo de Conta</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.tipo === 'DOADOR' ? 'Doador' : 'Instituição'} <span className="text-xs text-gray-400">(não editável)</span>
              </dd>
            </div>
          </dl>
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
        {!isEditing && (
           <div className="px-4 py-4 sm:px-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto"
            >
              Sair (Logout)
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 