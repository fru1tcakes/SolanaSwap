'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PriceData {
  timestamp: number;
  price: number;
}

export default function PriceChart() {
  const [priceData, setPriceData] = useState<PriceData[]>([])

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=7')
        const data = await response.json()
        const formattedData = data.prices.map(([timestamp, price]: [number, number]) => ({
          timestamp,
          price,
        }))
        setPriceData(formattedData)
      } catch (error) {
        console.error('Error fetching Solana price data:', error)
      }
    }

    fetchPriceData()
    const interval = setInterval(fetchPriceData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-purple-800 text-white mb-8">
      <CardHeader>
        <CardTitle>Solana Price Chart (7 Days)</CardTitle>
        <CardDescription className="text-purple-200">Live data from CoinGecko</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={priceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={(unixTime) => new Date(unixTime).toLocaleDateString()}
              stroke="#888"
            />
            <YAxis stroke="#888" />
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleString()}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line type="monotone" dataKey="price" stroke="#fbbf24" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

