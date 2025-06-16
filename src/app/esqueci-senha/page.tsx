'use client'

import { useState } from 'react'
import Link from 'next/link'
import { z } from 'zod'

const esqueceuSenhaSchema = z.object({
  email: z.string().email('Email inválido'),
})

export default function EsqueciSenhaPage() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email')?.toString() || ''

    try {
      const validatedData = esqueceuSenhaSchema.parse({ email })

      const response = await fetch('/api/auth/esqueci-senha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar solicitação')
      }

      setSuccess('Se o email estiver cadastrado, você receberá as instruções para redefinir sua senha.')
      form.reset()
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message)
      } else {
        setError(error instanceof Error ? error.message : 'Erro ao processar solicitação')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">Esqueceu sua senha?</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Digite seu email para receber as instruções de redefinição
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full px-3 py-2.5 text-base border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg sm:text-sm appearance-none bg-white"
                  placeholder="seu@email.com"
                  aria-describedby={error ? "email-error" : undefined}
                />
              </div>
              {error && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {error}
                </p>
              )}
            </div>

            {success && (
              <div className="rounded-md bg-green-50 p-4" role="alert">
                <div className="text-sm text-green-700">{success}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="sr-only">Carregando</span>
                    <span>Enviando...</span>
                  </>
                ) : (
                  'Enviar instruções'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center">
                <Link
                  href="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Voltar para o login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 