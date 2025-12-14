"use client"

import { useState } from "react"
import { CheckCircle, Phone, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

type OrderConfirmationProps = {
  orderNumber: string
  onNewOrder: () => void
}

const PHONE_NUMBER = "01055187574"

export function OrderConfirmation({ orderNumber, onNewOrder }: OrderConfirmationProps) {
  const [showCallDialog, setShowCallDialog] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PHONE_NUMBER)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-chickenara-red flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        <div className="relative h-24 w-24 mx-auto mb-6 rounded-full overflow-hidden">
          <Image src="/images/logo.jpeg" alt="Chickenara" fill className="object-cover" />
        </div>

        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-chickenara-dark mb-2">Order Confirmed!</h1>

        <p className="text-muted-foreground mb-4">Thank you for ordering from Chickenara</p>

        <div className="bg-chickenara-cream rounded-lg p-4 mb-6">
          <p className="text-sm text-muted-foreground">Order Number</p>
          <p className="text-xl font-bold text-chickenara-red">{orderNumber}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-6">We will contact you shortly to confirm your order.</p>

        <div className="space-y-3">
          <Button onClick={onNewOrder} className="w-full bg-chickenara-red hover:bg-chickenara-dark-red text-white">
            Place Another Order
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowCallDialog(true)}
            className="w-full border-chickenara-orange text-chickenara-dark hover:bg-chickenara-orange/10 bg-transparent"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Us
          </Button>
        </div>

        <p className="text-xs text-chickenara-orange mt-6 font-medium">Simply Chicken Simply Rice Simply Chickenara!</p>
      </div>

      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-chickenara-dark">Call Chickenara</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="bg-chickenara-cream rounded-lg p-4 w-full text-center">
              <p className="text-sm text-muted-foreground mb-1">Our Phone Number</p>
              <p className="text-2xl font-bold text-chickenara-red tracking-wide">{PHONE_NUMBER}</p>
            </div>
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="flex-1 border-chickenara-orange text-chickenara-dark hover:bg-chickenara-orange/10 bg-transparent"
              >
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
              <a href={`tel:${PHONE_NUMBER}`} className="flex-1">
                <Button className="w-full bg-chickenara-red hover:bg-chickenara-dark-red text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
