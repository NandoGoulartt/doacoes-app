import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DoAção - Plataforma de Doações',
  description: 'Conectando pessoas e instituições para fazer a diferença na vida de quem precisa.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          <ConditionalLayout>{children}</ConditionalLayout>
        </div>
      </body>
    </html>
  )
}
