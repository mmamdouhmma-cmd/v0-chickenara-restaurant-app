"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

type ToastType = {
  id: number
  message: string
  itemName: string
}

type ToastContextType = {
  showToast: (itemName: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([])

  const showToast = useCallback((itemName: string) => {
    const id = Date.now()
    console.log("[v0] Toast triggered for:", itemName)

    setToasts((prev) => [...prev, { id, message: "Added to cart", itemName }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 2500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 left-0 right-0 z-[9999] flex flex-col items-center gap-2 pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-chickenara-dark-red text-white px-6 py-3 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-auto max-w-[90vw] text-center"
          >
            <p className="font-semibold text-sm">{toast.message}</p>
            <p className="text-xs text-chickenara-cream/90">{toast.itemName}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useCustomToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useCustomToast must be used within ToastProvider")
  }
  return context
}
