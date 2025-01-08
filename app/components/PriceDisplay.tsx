'use client'

import { useCryptoPrices } from '../hooks/useCryptoPrices'

export default function PriceDisplay() {
  const prices = useCryptoPrices()

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-8">
      <h2 className="text-2xl font-semibold mb-4">Live Prices</h2>
      <ul className="space-y-2">
        <li className="flex justify-between">
          <span>Solana:</span>
          <span>${prices.solana.toFixed(2)}</span>
        </li>
        <li className="flex justify-between">
          <span>Bitcoin:</span>
          <span>${prices.bitcoin.toFixed(2)}</span>
        </li>
        <li className="flex justify-between">
          <span>USDT:</span>
          <span>${prices.usdt.toFixed(2)}</span>
        </li>
      </ul>
    </div>
  )
}

