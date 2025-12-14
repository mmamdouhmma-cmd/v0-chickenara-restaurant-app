export type MenuItem = {
  id: string
  nameEn: string
  nameAr: string
  description?: string
  price: number
  category: string
  requiresCustomization?: boolean // Added flag for meals needing rice selection
}

export type Category = {
  id: string
  nameEn: string
  nameAr: string
}

export const categories: Category[] = [
  { id: "meals", nameEn: "Meals", nameAr: "وجبات" },
  { id: "sandwiches", nameEn: "Sandwiches", nameAr: "ساندويتش" },
  { id: "salads", nameEn: "Salads", nameAr: "سلطة" },
  { id: "sauces", nameEn: "Sauces", nameAr: "صوصات" },
  { id: "extras", nameEn: "Extras", nameAr: "إضافات" },
]

export const menuItems: MenuItem[] = [
  // Meals - Added requiresCustomization flag and removed extra rice/chicken items
  {
    id: "chicken-original",
    nameEn: "Chicken Original",
    nameAr: "دجاج على الطريقة الأصلية",
    price: 200,
    category: "meals",
    requiresCustomization: true,
  },
  {
    id: "chicken-tandoori",
    nameEn: "Chicken Tandoori",
    nameAr: "دجاج تاندوري",
    price: 200,
    category: "meals",
    requiresCustomization: true,
  },
  {
    id: "chicken-lava",
    nameEn: "Chicken Lava",
    nameAr: "دجاج لافا",
    price: 235,
    category: "meals",
    requiresCustomization: true,
  },

  // Sandwiches
  {
    id: "fire-cracker",
    nameEn: "Fire Cracker",
    nameAr: "فاير كراكر",
    description: "Grilled chicken with seracheeue Sauce",
    price: 140,
    category: "sandwiches",
  },
  {
    id: "chickenara-revenge",
    nameEn: "Chickenara Revenge",
    nameAr: "تشيكنارا ريفنج",
    description: "Grilled chicken with cheese garlic sauce",
    price: 140,
    category: "sandwiches",
  },

  // Salads
  { id: "rocca-salad", nameEn: "Rocca Salad", nameAr: "سلطة جرجير", price: 35, category: "salads" },
  { id: "green-salad", nameEn: "Green Salad", nameAr: "سلطة خضراء", price: 35, category: "salads" },
  {
    id: "yogurt-cucumber",
    nameEn: "Yogurt with Cucumber",
    nameAr: "سلطة زبادي بالخيار",
    price: 35,
    category: "salads",
  },

  // Sauces
  { id: "shanhaleez", nameEn: "Shanhaleez", nameAr: "شانهاليز", price: 20, category: "sauces" },
  { id: "dakous", nameEn: "Dakous", nameAr: "دقوس", price: 20, category: "sauces" },
  { id: "tahini", nameEn: "Tahini", nameAr: "طحينة", price: 20, category: "sauces" },
  { id: "thomeya", nameEn: "Thomeya", nameAr: "ثومية", price: 20, category: "sauces" },

  // Extras
  { id: "fries", nameEn: "Fries", nameAr: "بطاطس بالفريت", price: 40, category: "extras" },
  { id: "cola", nameEn: "V Cola", nameAr: "كولا", price: 20, category: "extras" },
  { id: "water", nameEn: "Water", nameAr: "مياه", price: 10, category: "extras" },
]

export const riceTypes = [
  { id: "white-rice", nameEn: "White Rice", nameAr: "رز أبيض" },
  { id: "vegetable-rice", nameEn: "Vegetable Rice", nameAr: "رز بالخضار" },
  { id: "spicy-rice", nameEn: "Spicy Rice", nameAr: "رز حار" },
]

export const mealAddOns = [
  { id: "extra-chicken", nameEn: "Extra 50g Chicken", nameAr: "٥٠ جم دجاج إضافي", price: 50 },
  { id: "extra-rice", nameEn: "Extra Bowl of Rice", nameAr: "طبق رز إضافي", price: 30 },
]
