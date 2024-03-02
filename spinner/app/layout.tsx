import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BYU LoL Spinner',
  description: 'League of Legends role spinner for in-house custom games.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex h-full">{children}</body>
    </html>
  )
}
