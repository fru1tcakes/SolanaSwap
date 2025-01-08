import { useState, useEffect } from 'react'

interface CryptoPrices {
  solana: number
  bitcoin: number
  usdt: number
}

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CryptoPrices>({
    solana: 20,
    bitcoin: 30000,
    usdt: 1
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => ({
        solana: prevPrices.solana + (Math.random() - 0.5),
        bitcoin: prevPrices.bitcoin + (Math.random() - 0.5) * 100,
        usdt: 1 + (Math.random() - 0.5) * 0.001
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return prices
}

