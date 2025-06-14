import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Demo - Brandfeels',
  description: 'Demostration of Brandfeels marketing value.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <link
        rel="icon"
        href="/content/logos/icon.png"
      />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
