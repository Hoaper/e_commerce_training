import Providers from '@/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'e-commerce admin dashboard',
  description: 'Some e-commerce admin dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Providers>
      <html lang="en">
        <Toaster />
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  )
}
