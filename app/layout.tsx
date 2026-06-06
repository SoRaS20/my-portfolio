import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="noise">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
