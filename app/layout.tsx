import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SERVI Car - Plateforme de lavage auto',
  description: 'Réservez votre lavage auto en quelques clics',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0',
  themeColor: '#2563eb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen">{children}</body>
    </html>
  )
} 