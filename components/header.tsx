"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

type HeaderProps = {
  onCartClick: () => void
}

export function Header({ onCartClick }: HeaderProps) {
  const { itemCount } = useCart()

  return (
    <header className="sticky top-0 z-40 bg-chickenara-red shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 rounded-full overflow-hidden bg-chickenara-orange/20">
              <Image src="/images/logo.jpeg" alt="Chickenara Logo" fill className="object-cover" />
            </div>
            <div>
              <h1
                className="text-2xl font-extrabold text-chickenara-gold tracking-wide"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Chickenara
              </h1>
              <p className="text-chickenara-cream/80 text-xs font-medium">Simply Chicken Simply Rice</p>
            </div>
          </div>

          <Button
            onClick={onCartClick}
            variant="outline"
            className="relative bg-chickenara-orange hover:bg-chickenara-gold text-chickenara-dark border-none font-semibold"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-chickenara-dark text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  )
}
