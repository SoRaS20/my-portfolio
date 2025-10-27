import type React from "react"
import type { Metadata } from "next"
import { VT323 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
})

export const metadata: Metadata = {
  title: "Sohanur Rahman - AI Engineer & Developer",
  description:
    "Dynamic retro-terminal portfolio of Sohanur Rahman, Trainee Software Engineer specializing in AI, machine learning, and full-stack development. Featuring interactive terminal interface with matrix rain effects.",
  keywords:
    "Sohanur Rahman, Software Engineer, AI, Machine Learning, Web Development, Portfolio, BJIT Limited, Competitive Programming",
  authors: [{ name: "Sohanur Rahman" }],
  creator: "Sohanur Rahman",
  openGraph: {
    title: "Sohanur Rahman - AI Engineer & Developer",
    description:
      "Interactive terminal-style portfolio showcasing AI projects, competitive programming achievements, and software engineering expertise.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohanur Rahman - AI Engineer & Developer",
    description: "Interactive terminal-style portfolio showcasing AI projects and software engineering expertise.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={vt323.variable}>
      <body className="font-mono scan-lines bg-black text-green-400 antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
