import type { Metadata } from 'next'
import { DM_Mono, DM_Serif_Display, Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: ['400'], variable: '--font-heading' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Prashant Jadhav - Data Science & AI/ML Portfolio',
  description: 'Portfolio showcasing projects and experience in Data Science, AI, and Machine Learning.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSerif.variable} ${dmMono.variable}`}>{children}</body>
    </html>
  )
}