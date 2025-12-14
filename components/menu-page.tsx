"use client"

import { useState } from "react"
import { Header } from "./header"
import { MenuSection } from "./menu-section"
import { CartDrawer } from "./cart-drawer"
import { CheckoutModal } from "./checkout-modal"
import { OrderConfirmation } from "./order-confirmation"
import { MealCustomizationDialog } from "./meal-customization-dialog"
import { categories, menuItems, type MenuItem } from "@/lib/menu-data"

export function MenuPage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")
  const [customizeItem, setCustomizeItem] = useState<MenuItem | null>(null)

  const handleCheckout = () => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }

  const handleOrderComplete = (orderId: string) => {
    setCheckoutOpen(false)
    setOrderNumber(orderId)
    setOrderComplete(true)
  }

  const handleNewOrder = () => {
    setOrderComplete(false)
    setOrderNumber("")
  }

  const handleCustomize = (item: MenuItem) => {
    setCustomizeItem(item)
  }

  if (orderComplete) {
    return <OrderConfirmation orderNumber={orderNumber} onNewOrder={handleNewOrder} />
  }

  return (
    <div className="min-h-screen bg-chickenara-cream">
      <Header onCartClick={() => setCartOpen(true)} />

      <main className="container mx-auto px-4 py-8 pb-24">
        <div className="mb-8 text-center">
          <p className="text-chickenara-dark-red font-medium text-lg">Each meal is served with your choice of rice</p>
          <p className="text-muted-foreground">(White rice - Vegetable rice - Spicy rice)</p>
        </div>

        <div className="space-y-10">
          {categories.map((category) => (
            <MenuSection
              key={category.id}
              category={category}
              items={menuItems.filter((item) => item.category === category.id)}
              onCustomize={handleCustomize}
            />
          ))}
        </div>
      </main>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} onOrderComplete={handleOrderComplete} />

      <MealCustomizationDialog item={customizeItem} open={!!customizeItem} onClose={() => setCustomizeItem(null)} />
    </div>
  )
}
