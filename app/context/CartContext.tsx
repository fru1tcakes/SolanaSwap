'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  amount: number
  price: number
  total: number
  walletAddress: string
  lockedUntil: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'lockedUntil'>) => void
  removeFromCart: (index: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setCartItems(prevItems => 
        prevItems.filter(item => item.lockedUntil > Date.now())
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const addToCart = (item: Omit<CartItem, 'lockedUntil'>) => {
    const newItem = {
      ...item,
      lockedUntil: Date.now() + 5 * 60 * 1000 // 5 minutes from now
    }
    setCartItems(prevItems => [...prevItems, newItem])
  }

  const removeFromCart = (index: number) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

