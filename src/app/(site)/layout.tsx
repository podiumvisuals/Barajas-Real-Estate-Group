import type { Metadata } from 'next'
import React from 'react'

import './site.css'

export const metadata: Metadata = {
  title: 'Barajas Real Estate Group | Lily Barajas, REALTOR®',
  description:
    "Lily Barajas has closed 87 homes and counting — helping buyers, sellers, and investors move with confidence across Orange, Riverside, and Los Angeles counties.",
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
