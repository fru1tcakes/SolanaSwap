'use server'

import { Connection, PublicKey, Transaction, SystemProgram, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js'
import bs58 from 'bs58'

const SERVER_WALLET_PRIVATE_KEY = process.env.SERVER_WALLET_PRIVATE_KEY

if (!SERVER_WALLET_PRIVATE_KEY) {
  throw new Error('SERVER_WALLET_PRIVATE_KEY is not set in environment variables')
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export async function processPaymentAndSendSolana(recipientAddress: string, amount: number, paymentInfo: PaymentInfo) {
  try {
    // Simulate payment processing
    await simulatePaymentProcessing(paymentInfo)

    // If payment is successful, proceed with Solana transfer
    return await sendSolana(recipientAddress, amount)
  } catch (error) {
    console.error('Error processing payment or sending Solana:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: JSON.stringify(error)
    }
  }
}

async function simulatePaymentProcessing(paymentInfo: PaymentInfo): Promise<void> {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Simulate basic credit card validation
  if (paymentInfo.cardNumber.length !== 16 || !/^\d+$/.test(paymentInfo.cardNumber)) {
    throw new Error('Invalid card number')
  }

  if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
    throw new Error('Invalid expiry date')
  }

  if (paymentInfo.cvv.length !== 3 || !/^\d+$/.test(paymentInfo.cvv)) {
    throw new Error('Invalid CVV')
  }

  // If all validations pass, the payment is considered successful
}

async function sendSolana(recipientAddress: string, amount: number) {
  try {
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

    const serverWallet = Keypair.fromSecretKey(bs58.decode(SERVER_WALLET_PRIVATE_KEY))

    // Check server wallet balance
    const balance = await connection.getBalance(serverWallet.publicKey)
    if (balance < amount * LAMPORTS_PER_SOL) {
      throw new Error('Insufficient balance in server wallet')
    }

    const transaction = new Transaction()

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: serverWallet.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: LAMPORTS_PER_SOL * amount,
      })
    )

    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = serverWallet.publicKey

    transaction.sign(serverWallet)

    const signature = await connection.sendRawTransaction(transaction.serialize())

    await connection.confirmTransaction(signature)

    return { success: true, signature }
  } catch (error) {
    console.error('Error sending Solana:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: JSON.stringify(error)
    }
  }
}

