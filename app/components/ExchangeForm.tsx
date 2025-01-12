'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { processPaymentAndSendSolana } from '../actions/solanaActions'

interface ExchangeFormProps {
  initialAmount: string
  initialWallet: string
}

export default function ExchangeForm({ initialAmount, initialWallet }: ExchangeFormProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Processing payment...')

    const result = await processPaymentAndSendSolana(initialWallet, Number(initialAmount), {
      cardNumber,
      expiryDate,
      cvv
    })

    if (result.success) {
      setStatus(`Transaction successful! Signature: ${result.signature}`)
    } else {
      setStatus(`Error: ${result.error}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm text-gray-600">You send</span>
              <div className="text-right">
                <div className="text-lg font-semibold">{initialAmount} USD</div>
                <div className="text-sm text-gray-500">US Dollar</div>
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm text-gray-600">You get</span>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {(Number(initialAmount) / 200).toFixed(8)} SOL
                </div>
                <div className="text-sm text-gray-500">Solana</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600">Card Number</label>
                <Input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="1234567890123456"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Expiry Date</label>
                  <Input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '')
                      if (v.length >= 2) {
                        setExpiryDate(v.slice(0, 2) + '/' + v.slice(2, 4))
                      } else {
                        setExpiryDate(v)
                      }
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">CVV</label>
                  <Input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="123"
                    maxLength={3}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#00ffa3] hover:bg-[#00df93] text-black">
                Complete Purchase
              </Button>

              {status && (
                <p className="text-sm text-center text-gray-600">{status}</p>
              )}
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

