import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import PurchaseWidget from './components/PurchaseWidget'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1C2127] text-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 py-12">
          {/* Left side - Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#00ffa3] to-[#8fff98] bg-clip-text text-transparent">
                Buy SOL (Solana)
              </span>{' '}
              with Credit or Debit Card Online Instantly
            </h1>
            
            <p className="text-gray-400 text-lg">
              Start buying Solana instantly using your credit or debit card with just 5$:
            </p>

            <ul className="space-y-4">
              {[
                'Fast as light transactions < 10 min',
                '20+ payment methods',
                '24/7 support'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#00ffa3]" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <p className="text-gray-400">
                This is for fun and doesn't give you live Solana! Only Devnet.
              </p>
            </div>
          </div>

          {/* Right side - Purchase Widget */}
          <div className="flex-1 w-full max-w-md">
            <PurchaseWidget />
          </div>
        </div>
      </main>
    </div>
  )
}

