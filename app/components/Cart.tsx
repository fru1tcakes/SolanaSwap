'use client'

import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { processPaymentAndSendSolana } from '../actions/solanaActions'

const formatCardNumber = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 16)
}

const formatExpiryDate = (value: string) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  if (v.length >= 2) {
    return v.slice(0, 2) + '/' + v.slice(2, 4)
  }
  return v
}

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [checkoutStatus, setCheckoutStatus] = useState('')

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setCheckoutStatus('Processing payment and Solana transfer...')

    for (const item of cartItems) {
      const result = await processPaymentAndSendSolana(item.walletAddress, item.amount, {
        cardNumber,
        expiryDate,
        cvv
      })

      if (result.success) {
        setCheckoutStatus(`Transaction successful! Signature: ${result.signature}`)
      } else {
        setCheckoutStatus(`Error: ${result.error}`)
        return
      }
    }

    clearCart()
    setCardNumber('')
    setExpiryDate('')
    setCvv('')
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0)

  return (
    <Card className="bg-purple-800 text-white">
      <CardHeader>
        <CardTitle>Your DevNet Cart</CardTitle>
        <CardDescription className="text-purple-200">Review your Solana DevNet purchases</CardDescription>
      </CardHeader>
      <CardContent>
        {cartItems.length === 0 ? (
          <p>Your DevNet cart is empty</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item.amount} SOL to {item.walletAddress.slice(0, 4)}...{item.walletAddress.slice(-4)}</span>
                <span>${item.total.toFixed(2)}</span>
                <Button variant="outline" size="sm" onClick={() => removeFromCart(index)} className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-purple-900">
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
        <p className="text-lg font-bold mb-4">Total: ${totalAmount.toFixed(2)}</p>
        <form onSubmit={handleCheckout} className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-purple-200">Card Number</label>
            <Input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              placeholder="1234567890123456"
              maxLength={16}
              required
              className="bg-purple-700 text-white placeholder-purple-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-purple-200">Expiry Date</label>
              <Input
                type="text"
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="bg-purple-700 text-white placeholder-purple-300"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-purple-200">CVV</label>
              <Input
                type="text"
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="123"
                maxLength={3}
                required
                className="bg-purple-700 text-white placeholder-purple-300"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-500" disabled={cartItems.length === 0}>
            Complete Purchase
          </Button>
          {checkoutStatus && (
            <p className="text-sm text-center text-yellow-400">{checkoutStatus}</p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

