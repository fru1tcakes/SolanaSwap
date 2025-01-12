'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSolanaPrice } from '../hooks/useSolanaPrice'

export default function PurchaseWidget() {
  const router = useRouter()
  const [amount, setAmount] = useState('500')
  const [walletAddress, setWalletAddress] = useState('')
  const { price, isLoading, error } = useSolanaPrice()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/payment-selection?amount=${amount}&wallet=${walletAddress}&price=${price}`)
  }

  const getSolAmount = () => {
    if (!price) return '0'
    return (Number(amount) / price).toFixed(8)
  }

  return (
    <div>
      <Card className="bg-white">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">You send</label>
                <div className="mt-1 relative">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pr-20"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 text-gray-600 hover:text-gray-900"
                    >
                      USD <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600">You get</label>
                <div className="mt-1 relative">
                  <Input
                    type="text"
                    value={isLoading ? 'Loading...' : getSolAmount()}
                    readOnly
                    className="pr-20"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 text-gray-600 hover:text-gray-900"
                    >
                      SOL <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-100 border border-red-400 rounded p-2">
                  <p className="font-bold">Error fetching Solana price:</p>
                  <p>{error}</p>
                </div>
              )}

              {!error && (
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : price ? (
                    <span>1 SOL = ${price.toFixed(2)} USD</span>
                  ) : (
                    <span>Price unavailable</span>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm text-gray-600">Wallet Address</label>
                <Input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter your SOL wallet address"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#00ffa3] hover:bg-[#00df93] text-black font-semibold"
              disabled={isLoading || !!error}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Continue'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

