'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { processPaymentAndSendSolana } from '../actions/solanaActions'
import { useSolanaPrice } from '../hooks/useSolanaPrice'

interface PaymentFormProps {
  amount: string
  wallet: string
  providerId: string
}

export default function PaymentForm({ amount, wallet, providerId }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [status, setStatus] = useState('')
  const { price, isLoading } = useSolanaPrice()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Processing payment...')

    if (!price) {
      setStatus('Error: Unable to get current Solana price')
      return
    }

    const solAmount = Number(amount) / price

    const result = await processPaymentAndSendSolana(wallet, solAmount, {
      cardNumber,
      expiryDate,
      cvv
    })

    if (result.success) {
      router.push(`/success?amount=${amount}&solAmount=${solAmount.toFixed(8)}&wallet=${wallet}&signature=${result.signature}`)
    } else {
      setStatus(`Error: ${result.error}`)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-4">
        <div>
          <Input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            placeholder="Card number"
            required
            className="bg-[#2D3748] border-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            className="bg-[#2D3748] border-gray-700 text-white placeholder-gray-400"
          />
          <Input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
            placeholder="CVV"
            maxLength={3}
            required
            className="bg-[#2D3748] border-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#00ffa3] hover:bg-[#00df93] text-black font-semibold h-12 rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Complete Purchase'}
      </Button>

      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-center text-gray-400"
        >
          {status}
        </motion.p>
      )}
    </motion.form>
  )
}

