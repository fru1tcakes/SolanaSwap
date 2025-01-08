'use client'

import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PurchaseForm() {
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState(0)
  const [walletAddress, setWalletAddress] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
        const data = await response.json()
        setPrice(data.solana.usd)
      } catch (error) {
        console.error('Error fetching Solana price:', error)
      }
    }

    fetchPrice()
    const interval = setInterval(fetchPrice, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const solAmount = Number(amount)
    const total = solAmount * price
    addToCart({
      amount: solAmount,
      price,
      total,
      walletAddress
    })
    setAmount('')
    setWalletAddress('')
  }

  return (
    <Card className="bg-purple-800 text-white">
      <CardHeader>
        <CardTitle>Add Solana to Cart (DevNet)</CardTitle>
        <CardDescription className="text-purple-200">Current price: ${price.toFixed(2)} USD</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-purple-200">Amount (SOL)</label>
            <Input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              className="bg-purple-700 text-white placeholder-purple-300"
            />
          </div>
          <div>
            <label htmlFor="walletAddress" className="block text-sm font-medium text-purple-200">Wallet Address</label>
            <Input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your Solana wallet address"
              required
              className="bg-purple-700 text-white placeholder-purple-300"
            />
          </div>
          <div>
            <p className="text-sm text-purple-200">
              Total: ${(Number(amount) * price).toFixed(2)} USD
            </p>
          </div>
          <Button type="submit" className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-500">
            Add to Cart
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

