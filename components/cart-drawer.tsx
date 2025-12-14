"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { riceTypes } from "@/lib/menu-data"

type CartDrawerProps = {
  open: boolean
  onClose: () => void
  onCheckout: () => void
}

export function CartDrawer({ open, onClose, onCheckout }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()

  const getRiceTypeName = (riceId: string) => {
    return riceTypes.find((r) => r.id === riceId)?.nameEn || riceId
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-chickenara-red">
          <h2 className="text-xl font-bold text-chickenara-gold flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            Your Cart
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-chickenara-cream hover:bg-chickenara-dark-red"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-chickenara-orange/50 mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground">Add some delicious items!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.customizationId || item.id}
                  className="flex items-center gap-3 p-3 bg-chickenara-cream rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-chickenara-dark">{item.nameEn}</h4>
                    {item.riceType && (
                      <p className="text-xs text-chickenara-orange">Rice: {getRiceTypeName(item.riceType)}</p>
                    )}
                    {item.addOns && item.addOns.length > 0 && (
                      <p className="text-xs text-muted-foreground">+ {item.addOns.map((a) => a.nameEn).join(", ")}</p>
                    )}
                    <p className="text-sm text-chickenara-red font-semibold">{item.price} EGP</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 border-chickenara-red text-chickenara-red bg-transparent"
                      onClick={() => updateQuantity(item.customizationId || item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 border-chickenara-red text-chickenara-red bg-transparent"
                      onClick={() => updateQuantity(item.customizationId || item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeItem(item.customizationId || item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4 bg-white">
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-chickenara-dark">Total:</span>
              <span className="text-chickenara-red">{total} EGP</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={clearCart}
                className="flex-1 border-chickenara-red text-chickenara-red hover:bg-chickenara-red hover:text-white bg-transparent"
              >
                Clear Cart
              </Button>
              <Button onClick={onCheckout} className="flex-1 bg-chickenara-red hover:bg-chickenara-dark-red text-white">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
