import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface PixModalProps {
  isOpen: boolean
  onClose: () => void
  valor: number
  onPaymentComplete: () => void
  campanha: {
    id: string
    titulo: string
    instituicao: {
      nome: string
    }
  }
}

export default function PixModal({ isOpen, onClose, valor, onPaymentComplete, campanha }: PixModalProps) {
  const [status, setStatus] = useState<'pending' | 'processing' | 'completed'>('pending')
  const [pixCode] = useState(`${campanha.id}-${Date.now()}`)

  useEffect(() => {
    if (status === 'processing') {
      const timer = setTimeout(() => {
        setStatus('completed')
        onPaymentComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [status, onPaymentComplete])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Pagamento PIX - {campanha.titulo}
          </h3>
          
          {status === 'pending' && (
            <>
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  Valor a pagar: R$ {valor.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Para: {campanha.instituicao.nome}
                </p>
              </div>

              <div className="flex justify-center mb-4">
                <QRCodeSVG
                  value={pixCode}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Escaneie o QR Code acima com seu aplicativo de pagamento
              </p>

              <button
                type="button"
                onClick={() => setStatus('processing')}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Simular Pagamento
              </button>
            </>
          )}

          {status === 'processing' && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-sm text-gray-500">Processando pagamento...</p>
            </div>
          )}

          {status === 'completed' && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 mb-4">Pagamento realizado com sucesso!</p>
            </div>
          )}

          {status !== 'processing' && (
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {status === 'completed' ? 'Fechar' : 'Cancelar'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 