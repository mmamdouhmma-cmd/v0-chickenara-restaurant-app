"use client"

import type { Category, MenuItem } from "@/lib/menu-data"
import { MenuItemCard } from "./menu-item-card"

type MenuSectionProps = {
  category: Category
  items: MenuItem[]
  onCustomize?: (item: MenuItem) => void // Added callback prop
}

export function MenuSection({ category, items, onCustomize }: MenuSectionProps) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold text-chickenara-red">{category.nameEn}</h2>
        <span className="text-xl text-chickenara-orange font-semibold" style={{ fontFamily: "var(--font-arabic)" }}>
          - {category.nameAr}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} onCustomize={onCustomize} />
        ))}
      </div>
    </section>
  )
}
