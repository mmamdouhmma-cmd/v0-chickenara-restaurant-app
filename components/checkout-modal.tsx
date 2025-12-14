"use client"

import type React from "react"

import { useState } from "react"
import { X, Loader2, CreditCard, Banknote, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/lib/cart-context"

type CheckoutModalProps = {
  open: boolean
  onClose: () => void
  onOrderComplete: (orderId: string) => void
}

export function CheckoutModal({ open, onClose, onOrderComplete }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryTime: "asap",
    customTime: "",
    paymentMethod: "cash",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: form.name,
            phone: form.phone,
            address: form.address,
          },
          deliveryTime: form.deliveryTime === "asap" ? "As Soon As Possible" : form.customTime,
          paymentMethod: form.paymentMethod,
          items: items.map((item) => ({
            id: item.id,
            name: item.nameEn,
            nameAr: item.nameAr,
            price: item.price,
            quantity: item.quantity,
            riceType: item.riceType || null,
            addOns: item.addOns || [],
          })),
          total,
        }),
      })

      const data = await response.json()

      clearCart()
      onOrderComplete(data.orderId)
    } catch (error) {
      console.error("Order failed:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-xl z-50 shadow-xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b bg-chickenara-red rounded-t-xl">
          <h2 className="text-xl font-bold text-chickenara-gold">Checkout</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-chickenara-cream hover:bg-chickenara-dark-red"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-5">
          <div className="space-y-4">
            <h3 className="font-semibold text-chickenara-dark border-b pb-2">Your Details</h3>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter your name"
                className="border-chickenara-orange/50 focus-visible:ring-chickenara-red"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="01xxxxxxxxx"
                className="border-chickenara-orange/50 focus-visible:ring-chickenara-red"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Input
                id="address"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Enter your full address"
                className="border-chickenara-orange/50 focus-visible:ring-chickenara-red"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-chickenara-dark border-b pb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Delivery Time
            </h3>

            <RadioGroup
              value={form.deliveryTime}
              onValueChange={(value) => setForm({ ...form, deliveryTime: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asap" id="asap" className="border-chickenara-red text-chickenara-red" />
                <Label htmlFor="asap" className="cursor-pointer">
                  As Soon As Possible
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="scheduled"
                  id="scheduled"
                  className="border-chickenara-red text-chickenara-red"
                />
                <Label htmlFor="scheduled" className="cursor-pointer">
                  Schedule for later
                </Label>
              </div>
            </RadioGroup>

            {form.deliveryTime === "scheduled" && (
              <Input
                type="time"
                required
                value={form.customTime}
                onChange={(e) => setForm({ ...form, customTime: e.target.value })}
                className="border-chickenara-orange/50 focus-visible:ring-chickenara-red"
              />
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-chickenara-dark border-b pb-2">Payment Method</h3>

            <RadioGroup
              value={form.paymentMethod}
              onValueChange={(value) => setForm({ ...form, paymentMethod: value })}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-chickenara-orange/30 hover:bg-chickenara-cream transition-colors">
                <RadioGroupItem value="cash" id="cash" className="border-chickenara-red text-chickenara-red" />
                <Banknote className="h-5 w-5 text-chickenara-orange" />
                <Label htmlFor="cash" className="cursor-pointer flex-1">
                  Cash on Delivery
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-chickenara-orange/30 hover:bg-chickenara-cream transition-colors">
                <RadioGroupItem value="instapay" id="instapay" className="border-chickenara-red text-chickenara-red" />
                <CreditCard className="h-5 w-5 text-chickenara-orange" />
                <Label htmlFor="instapay" className="cursor-pointer flex-1">
                  <span>InstaPay</span>
                  <span className="block text-xs text-muted-foreground">Send to: 01055187574</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-chickenara-cream rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-chickenara-dark">Order Summary</h4>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.nameEn} x{item.quantity}
                </span>
                <span>{item.price * item.quantity} EGP</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-bold text-chickenara-red">
              <span>Total</span>
              <span>{total} EGP</span>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-chickenara-red hover:bg-chickenara-dark-red text-white py-6 text-lg font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Placing Order...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </form>
      </div>
    </>
  )
}
