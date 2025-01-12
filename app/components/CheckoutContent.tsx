'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Info } from 'lucide-react'
import PaymentForm from './PaymentForm'
import { useSolanaPrice } from '../hooks/useSolanaPrice'

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') || '0'
  const wallet = searchParams.get('wallet') || ''
  const providerId = searchParams.get('provider') || ''
  
  const { price, isLoading, error } = useSolanaPrice()
  const [showFees, setShowFees] = useState(false)

  const getSolAmount = () => {
    if (!price) return '0'
    return (Number(amount) / price).toFixed(8)
  }

  const getProviderRate = () => {
    if (!price) return 0
    const markup = 0.01 // Assuming a 1% markup for the selected provider
    return price * (1 + markup)
  }

  const processingFee = 20
  const networkFee = 0.17
  const totalFees = processingFee + networkFee

  return (
    <div className="min-h-screen bg-[#1C2127] text-white p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1F2937] rounded-3xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Buy Solana</h1>
          <button className="text-gray-400 hover:text-white">
            <span className="sr-only">Menu</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-[#2D3748] rounded-xl p-4">
            <label className="text-sm text-gray-400">You pay</label>
            <div className="flex items-center justify-between mt-1">
              <input
                type="text"
                value={amount}
                readOnly
                className="bg-transparent text-xl font-semibold focus:outline-none"
              />
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <span>USD</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-[#2D3748] rounded-xl p-4">
            <label className="text-sm text-gray-400">You get</label>
            <div className="flex items-center justify-between mt-1">
              <input
                type="text"
                value={isLoading ? 'Loading...' : getSolAmount()}
                readOnly
                className="bg-transparent text-xl font-semibold focus:outline-none"
              />
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <span>SOL</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <span>Exchange rate</span>
              <Info className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span>1 SOL = ${isLoading ? '...' : getProviderRate().toFixed(2)}</span>
              <span className="text-[#00ffa3]">13s</span>
            </div>
          </div>

          <div className="bg-[#2D3748] rounded-xl p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>To wallet address</span>
              <span className="text-[#00ffa3]">Solana network</span>
            </div>
            <input
              type="text"
              value={wallet}
              readOnly
              className="w-full bg-transparent text-sm font-mono focus:outline-none"
            />
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold">Total</span>
            <div className="text-right">
              <div className="text-xl font-semibold">${Number(amount) + totalFees}</div>
              <button 
                className="text-sm text-gray-400 flex items-center gap-1"
                onClick={() => setShowFees(!showFees)}
              >
                Total fees
                <ChevronDown className={`w-4 h-4 transform ${showFees ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {showFees && (
            <div className="text-sm text-gray-400 space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Processing fee</span>
                <span>${processingFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Network fee</span>
                <span>${networkFee}</span>
              </div>
            </div>
          )}

          <PaymentForm amount={amount} wallet={wallet} providerId={providerId} />
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

