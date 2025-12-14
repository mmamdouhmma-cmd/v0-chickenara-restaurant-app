import { NextResponse } from "next/server"

const BACKEND_URL = "https://v0-chickenara-restaurant-backend.vercel.app/api/orders"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: body.customer.name,
        customerPhone: body.customer.phone,
        customerAddress: body.customer.address,
        items: body.items,
        deliveryTime: body.deliveryTime,
        paymentMethod: body.paymentMethod,
        total: body.total,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || "Backend error")
    }

    return NextResponse.json({
      success: true,
      orderId: data.orderId || `CHK-${Date.now().toString(36).toUpperCase()}`,
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
