'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Loader2 } from 'lucide-react'
import { useSolanaPrice } from '../hooks/useSolanaPrice'

interface TransactionSummaryProps {
  amount: string
  wallet: string
}

export default function TransactionSummary({ amount, wallet }: TransactionSummaryProps) {
  const { price, isLoading } = useSolanaPrice()
  const processingFee = 20
  const networkFee = 0.17

  const getSolAmount = () => {
    if (!price) return '0'
    return (Number(amount) / price).toFixed(8)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Transaction details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-sm text-gray-500">You get</div>
              <div className="font-semibold">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  `~ ${getSolAmount()} SOL`
                )}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-500">Exchange rate</div>
              <div className="font-semibold flex items-center gap-2">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>1 SOL = ${price?.toFixed(2)} USD</span>
                    <span className="text-[#00ffa3] text-sm">13s</span>
                  </>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>Processing fee</span>
                <Info className="w-4 h-4" />
              </div>
              <div className="font-semibold">${processingFee.toFixed(2)} USD</div>
            </div>

            <div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <span>Network fee</span>
                <Info className="w-4 h-4" />
              </div>
              <div className="font-semibold">${networkFee.toFixed(2)} USD</div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-500">You send</div>
              <div className="font-semibold">${amount} USD</div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-gray-500">Wallet address</div>
              <div className="font-mono text-sm break-all mt-1">
                {wallet}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

