"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import type { MenuItem } from "@/lib/menu-data"
import { riceTypes, mealAddOns } from "@/lib/menu-data"
import { useCart } from "@/lib/cart-context"
import { useCustomToast } from "@/lib/toast-context"

type MealCustomizationDialogProps = {
  item: MenuItem | null
  open: boolean
  onClose: () => void
}

export function MealCustomizationDialog({ item, open, onClose }: MealCustomizationDialogProps) {
  const [selectedRice, setSelectedRice] = useState(riceTypes[0].id)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const { addCustomizedItem } = useCart()
  const { showToast } = useCustomToast()

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const calculateTotal = () => {
    if (!item) return 0
    const addOnsTotal = mealAddOns.filter((a) => selectedAddOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0)
    return item.price + addOnsTotal
  }

  const handleConfirm = () => {
    if (!item) return

    const addOns = mealAddOns
      .filter((a) => selectedAddOns.includes(a.id))
      .map((a) => ({ id: a.id, nameEn: a.nameEn, price: a.price }))

    addCustomizedItem(item, selectedRice, addOns)
    showToast(item.nameEn)

    // Reset state
    setSelectedRice(riceTypes[0].id)
    setSelectedAddOns([])
    onClose()
  }

  const handleClose = () => {
    setSelectedRice(riceTypes[0].id)
    setSelectedAddOns([])
    onClose()
  }

  if (!item) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-chickenara-cream">
        <DialogHeader>
          <DialogTitle className="text-chickenara-red text-xl">
            {item.nameEn}
            <span className="block text-sm text-chickenara-orange font-normal">{item.nameAr}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rice Type Selection */}
          <div className="space-y-3">
            <Label className="text-chickenara-dark font-semibold text-base">
              Choose Rice Type <span className="text-chickenara-red">*</span>
            </Label>
            <RadioGroup value={selectedRice} onValueChange={setSelectedRice} className="space-y-2">
              {riceTypes.map((rice) => (
                <div
                  key={rice.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-chickenara-orange/30 bg-white hover:border-chickenara-orange transition-colors"
                >
                  <RadioGroupItem value={rice.id} id={rice.id} className="text-chickenara-red" />
                  <Label htmlFor={rice.id} className="flex-1 cursor-pointer">
                    <span className="text-chickenara-dark">{rice.nameEn}</span>
                    <span className="block text-sm text-chickenara-orange">{rice.nameAr}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Add-ons */}
          <div className="space-y-3">
            <Label className="text-chickenara-dark font-semibold text-base">Add-ons (Optional)</Label>
            <div className="space-y-2">
              {mealAddOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-chickenara-orange/30 bg-white hover:border-chickenara-orange transition-colors"
                >
                  <Checkbox
                    id={addOn.id}
                    checked={selectedAddOns.includes(addOn.id)}
                    onCheckedChange={() => handleAddOnToggle(addOn.id)}
                    className="border-chickenara-red data-[state=checked]:bg-chickenara-red data-[state=checked]:border-chickenara-red"
                  />
                  <Label htmlFor={addOn.id} className="flex-1 cursor-pointer">
                    <span className="text-chickenara-dark">{addOn.nameEn}</span>
                    <span className="block text-sm text-chickenara-orange">{addOn.nameAr}</span>
                  </Label>
                  <span className="text-chickenara-red font-semibold">+{addOn.price} EGP</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <div className="flex-1 text-left">
            <span className="text-sm text-muted-foreground">Total: </span>
            <span className="text-xl font-bold text-chickenara-red">{calculateTotal()} EGP</span>
          </div>
          <Button
            variant="outline"
            onClick={handleClose}
            className="border-chickenara-red text-chickenara-red bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-chickenara-red hover:bg-chickenara-dark-red text-white">
            Add to Cart
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
