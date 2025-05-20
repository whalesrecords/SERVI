import './globals.css'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
}

export const metadata: Metadata = {
  title: 'SERVI - Plateforme de Services à la Personne',
  description: 'Trouvez et réservez des services à la personne en quelques clics : ménage, jardinage, bricolage, garde d\'enfants, et plus encore.',
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