import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  title: 'Centre Dentaire Le Pont | Dentiste à Tanger — Résidence Florencia',
  description:
    'Centre Dentaire Le Pont — centre dentaire à la Résidence Florencia, Tanger. Consultation, nettoyage et détartrage, blanchiment, prothèses, implants et orthodontie, pour adultes et enfants. Bâtiment 02, Porte 01, Route Principale, Rue Florencia, Tanger 90000. Réservez sur WhatsApp.',
  keywords: ['Centre Dentaire Le Pont', 'dentiste Tanger', 'dentiste à Tanger', 'implants dentaires Tanger', 'orthodontie Tanger', 'blanchiment dentaire Tanger', 'مركز طب الأسنان طنجة', 'طبيب أسنان طنجة', 'Le Pont Tanger'],
  icons: {
    icon: '/images/logo-favicon-hd.png',
    apple: '/images/logo-favicon-hd.png',
  },
  openGraph: {
    title: 'Centre Dentaire Le Pont | Dentiste à Tanger',
    description:
      'Votre sourire commence au Centre Dentaire Le Pont, à la Résidence Florencia — Tanger. Réservez votre rendez-vous sur WhatsApp.',
    type: 'website',
    locale: 'ar_MA',
  },
}

export const viewport: Viewport = {
  themeColor: '#4FC3F7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${inter.variable} ${playfair.variable} ${plexArabic.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
