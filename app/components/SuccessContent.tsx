'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const amount = searchParams.get('amount') || '0'
  const solAmount = searchParams.get('solAmount') || '0'
  const wallet = searchParams.get('wallet') || ''
  const signature = searchParams.get('signature') || ''

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#1C2127] text-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#1F2937] rounded-3xl p-8 space-y-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
        >
          <CheckCircle className="w-20 h-20 text-[#00ffa3] mx-auto" />
        </motion.div>

        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Transaction Successful!
        </motion.h1>

        <motion.div 
          className="space-y-4 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p>You have successfully purchased:</p>
          <p className="text-2xl font-semibold text-[#00ffa3]">{solAmount} SOL</p>
          <p>for</p>
          <p className="text-2xl font-semibold text-[#00ffa3]">${amount} USD</p>
        </motion.div>

        <motion.div 
          className="text-sm text-gray-400 break-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <p>Sent to wallet:</p>
          <p>{wallet}</p>
        </motion.div>

        <motion.div 
          className="text-sm text-gray-400 break-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p>Transaction signature:</p>
          <p>{signature}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Button 
            onClick={() => router.push('/')}
            className="bg-[#00ffa3] hover:bg-[#00df93] text-black font-semibold"
          >
            Return to Home <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

