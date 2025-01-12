'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface PaymentMethodsProps {
  amount: string
  wallet: string
}

const methods = [
  {
    id: 'card',
    name: 'Credit / Debit Card',
    icon: '/visa-mc.svg',
    description: 'Visa, Mastercard',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: '/apple-pay.svg',
    description: 'Fast and secure',
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: '/google-pay.svg',
    description: 'Quick checkout',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '/paypal.svg',
    description: 'Safe payment',
  }
]

export default function PaymentMethods({ amount, wallet }: PaymentMethodsProps) {
  const router = useRouter()

  const handleMethodSelect = (methodId: string) => {
    router.push(`/checkout?amount=${amount}&wallet=${wallet}&method=${methodId}`)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {methods.map((method, index) => (
        <motion.div
          key={method.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            className="w-full h-24 flex items-center gap-4 p-4 hover:border-[#00ffa3] hover:bg-gray-50"
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className="w-12 h-12 relative flex-shrink-0">
              <Image
                src={method.icon}
                alt={method.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-left">
              <div className="font-medium">{method.name}</div>
              <div className="text-sm text-gray-500">{method.description}</div>
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

