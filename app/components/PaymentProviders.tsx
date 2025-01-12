'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSolanaPrice } from '../hooks/useSolanaPrice'

interface PaymentProvidersProps {
  amount: string
  wallet: string
}

const PROVIDER_MARKUPS = {
  topper: 0.01, // 1%
  kado: 0.015, // 1.5%
  revolut: 0.02, // 2%
  unlimit: 0.025, // 2.5%
  banxa: 0.03, // 3%
  moonpay: 0.035, // 3.5%
}

export default function PaymentProviders({ amount, wallet }: PaymentProvidersProps) {
  const router = useRouter()
  const { price, isLoading } = useSolanaPrice()

  const getProviderRate = (basePrice: number, markup: number) => {
    return basePrice * (1 + markup)
  }

  const providers = price
    ? Object.entries(PROVIDER_MARKUPS).map(([id, markup], index) => {
        const rate = getProviderRate(price, markup)
        return {
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          rate: rate.toFixed(8),
          isBest: index === 0,
          fee: `${(markup * 100).toFixed(1)}%`
        }
      })
    : []

  const handleProviderSelect = (providerId: string) => {
    router.push(`/checkout?amount=${amount}&wallet=${wallet}&provider=${providerId}&price=${price}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="h-16 bg-gray-100 animate-pulse rounded-lg"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {providers.map((provider, index) => (
        <div
          key={provider.id}
        >
          <Button
            variant="outline"
            className={`w-full h-16 flex items-center justify-between px-4 hover:border-[#00ffa3] hover:bg-gray-50 ${
              provider.isBest ? 'border-[#00ffa3] bg-[#00ffa3]/5' : ''
            }`}
            onClick={() => handleProviderSelect(provider.id)}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full" />
              <div className="text-left">
                <div className="font-medium flex items-center gap-2">
                  {provider.name}
                  {provider.isBest && (
                    <Badge variant="secondary" className="bg-[#00ffa3] text-black">
                      BEST RATE
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-500">Fee: {provider.fee}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono">{provider.rate}</div>
              <div className="text-sm text-gray-500">USD/SOL</div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  )
}

