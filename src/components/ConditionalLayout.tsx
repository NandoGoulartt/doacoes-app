'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const noHeaderFooterPaths = ['/login', '/cadastro']

  const showHeaderFooter = !noHeaderFooterPaths.includes(pathname)

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </>
  )
} 