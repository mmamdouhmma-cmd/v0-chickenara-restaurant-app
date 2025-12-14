import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import { ToastProvider } from "@/lib/toast-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Chickenara - Simply Chicken Simply Rice",
  description: "Order delicious chicken meals from Chickenara. Simply Chicken Simply Rice Simply Chickenara!",
  generator: "v0.app",
  icons: {
    icon: "/icon-512x512.jpeg",
    apple: "/apple-touch-icon.jpeg",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#B91C1C",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ToastProvider>
          <CartProvider>{children}</CartProvider>
        </ToastProvider>
        <Analytics />
      </body>
    </html>
  )
}
