"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { MenuItem } from "./menu-data"

export type CartItem = MenuItem & {
  quantity: number
  riceType?: string
  addOns?: { id: string; nameEn: string; price: number }[]
  customizationId?: string // Unique ID for customized items
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  addCustomizedItem: (item: MenuItem, riceType: string, addOns: { id: string; nameEn: string; price: number }[]) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && !i.customizationId)
      if (existing) {
        return prev.map((i) => (i.id === item.id && !i.customizationId ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const addCustomizedItem = (
    item: MenuItem,
    riceType: string,
    addOns: { id: string; nameEn: string; price: number }[],
  ) => {
    const customizationId = `${item.id}-${riceType}-${addOns.map((a) => a.id).join("-")}-${Date.now()}`
    const addOnsTotal = addOns.reduce((sum, addon) => sum + addon.price, 0)

    setItems((prev) => [
      ...prev,
      {
        ...item,
        quantity: 1,
        riceType,
        addOns,
        customizationId,
        price: item.price + addOnsTotal,
      },
    ])
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => (i.customizationId || i.id) !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => ((i.customizationId || i.id) === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, addCustomizedItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
