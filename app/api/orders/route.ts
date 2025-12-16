import { NextResponse } from "next/server"

const BACKEND_URL = "https://v0-chickenara-order-app.vercel.app/api/orders"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const transformedItems = body.items.map((item: any) => {
      const addOns: Array<{ name: string; price: number }> = []

      // Add rice type as an add-on if it exists (for meal items)
      if (item.riceType) {
        addOns.push({
          name: `Rice: ${item.riceType}`,
          price: 0, // Rice type selection is included in base price
        })
      }

      // Add optional extras as add-ons
      if (item.addOns && Array.isArray(item.addOns)) {
        item.addOns.forEach((addon: any) => {
          addOns.push({
            name: addon.name,
            price: addon.price,
          })
        })
      }

      return {
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        ...(addOns.length > 0 && { addOns }),
      }
    })

    const orderNumber = `CHK-${Date.now().toString(36).toUpperCase()}`

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_number: orderNumber,
        customer_name: body.customer.name,
        customer_phone: body.customer.phone,
        customer_address: body.customer.address,
        items: transformedItems,
        total_amount: body.total,
        payment_method: body.paymentMethod,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || "Backend error")
    }

    return NextResponse.json({
      success: true,
      orderId: orderNumber,
      message: "Order placed successfully",
    })
  } catch (error) {
    console.error("Order error:", error)
    return NextResponse.json({ success: false, message: "Failed to place order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const response = await fetch(BACKEND_URL)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ orders: [], error: "Failed to fetch orders" })
  }
}
