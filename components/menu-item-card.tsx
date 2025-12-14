"use client"

import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { MenuItem } from "@/lib/menu-data"
import { useCart } from "@/lib/cart-context"
import { useCustomToast } from "@/lib/toast-context"

type MenuItemCardProps = {
  item: MenuItem
  onCustomize?: (item: MenuItem) => void // Added callback for customization
}

export function MenuItemCard({ item, onCustomize }: MenuItemCardProps) {
  const { items, addItem, updateQuantity } = useCart()
  const { showToast } = useCustomToast()

  const cartItem = item.requiresCustomization ? null : items.find((i) => i.id === item.id && !i.customizationId)
  const quantity = cartItem?.quantity || 0

  const handleAddItem = () => {
    if (item.requiresCustomization && onCustomize) {
      onCustomize(item)
    } else {
      addItem(item)
      showToast(item.nameEn)
    }
  }

  return (
    <Card className="bg-white border-chickenara-orange/30 hover:border-chickenara-orange transition-colors overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-chickenara-dark">{item.nameEn}</h3>
            <p className="text-sm text-chickenara-orange" style={{ fontFamily: "var(--font-arabic)" }}>
              {item.nameAr}
            </p>
          </div>
          <span className="text-lg font-bold text-chickenara-red whitespace-nowrap">{item.price} EGP</span>
        </div>

        {item.description && <p className="text-xs text-muted-foreground mb-3">{item.description}</p>}

        <div className="flex items-center justify-end gap-2">
          {quantity > 0 && !item.requiresCustomization ? (
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-chickenara-red text-chickenara-red hover:bg-chickenara-red hover:text-white bg-transparent"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-semibold text-chickenara-dark">{quantity}</span>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-chickenara-red text-chickenara-red hover:bg-chickenara-red hover:text-white bg-transparent"
                onClick={handleAddItem}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button onClick={handleAddItem} className="bg-chickenara-red hover:bg-chickenara-dark-red text-white">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
