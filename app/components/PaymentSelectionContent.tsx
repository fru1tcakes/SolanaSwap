'use client'

import { useSearchParams } from 'next/navigation'
import PaymentMethods from './PaymentMethods'
import PaymentProviders from './PaymentProviders'
import TransactionSummary from './TransactionSummary'
import { Card, CardContent } from "@/components/ui/card"

export default function PaymentSelectionContent() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount') || '0'
  const wallet = searchParams.get('wallet') || ''

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment methods</h2>
                    <PaymentMethods amount={amount} wallet={wallet} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Payment offers for SOL</h2>
                      <span className="text-sm text-gray-500">Best rate first</span>
                    </div>
                    <PaymentProviders amount={amount} wallet={wallet} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-4">
            <TransactionSummary amount={amount} wallet={wallet} />
          </div>
        </div>
      </div>
    </div>
  )
}

