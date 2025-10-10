import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PlatFormula.One - AI-Powered Startup Accelerator',
  description: 'B2B SaaS Startup Accelerator Program And Founders Toolbox SDK',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
