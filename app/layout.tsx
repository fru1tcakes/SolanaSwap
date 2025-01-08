import './globals.css'
import { Inter } from 'next/font/google'
import { CartProvider } from './context/CartContext'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SolanaSwap - Buy Solana Instantly',
  description: 'Purchase Solana with real-time pricing and secure transactions on DevNet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-purple-900 to-indigo-900 text-white`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}

