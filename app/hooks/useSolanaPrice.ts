'use client'

import { useState, useEffect } from 'react'

const API_KEY = 'CG-kyfXuq1nFDdaHf8ST5RNgtES'

export function useSolanaPrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
          {
            headers: {
              'x-cg-demo-api-key': API_KEY
            }
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }

        const data = await response.json()

        if (!data.solana || !data.solana.usd) {
          throw new Error('Unexpected data structure in API response')
        }

        setPrice(data.solana.usd)
        setError(null)
      } catch (err) {
        console.error('Error fetching Solana price:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setPrice(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return { price, isLoading, error }
}

