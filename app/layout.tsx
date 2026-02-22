import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sohanur Rahman — AI Engineer & Full-Stack Developer",
  description:
    "Personal portfolio of Sohanur Rahman — AI & ML Engineer, Full-Stack Developer, and Competitive Programmer. Building intelligent, high-performance software solutions.",
  keywords:
    "Sohanur Rahman, AI Engineer, Machine Learning, Full-Stack Developer, Next.js, Python, FastAPI, Portfolio, BJIT Limited",
  authors: [{ name: "Sohanur Rahman" }],
  creator: "Sohanur Rahman",
  openGraph: {
    title: "Sohanur Rahman — AI Engineer & Full-Stack Developer",
    description:
      "AI & ML engineer building intelligent, high-performance solutions. Explore projects, experience, and skills.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohanur Rahman — AI Engineer & Full-Stack Developer",
    description: "AI & ML engineer building intelligent software solutions.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="noise" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#05050f", color: "#f1f5f9" }}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
