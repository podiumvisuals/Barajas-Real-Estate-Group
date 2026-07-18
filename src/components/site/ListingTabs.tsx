'use client'

import { useState } from 'react'

import type { Listing } from '@/payload-types'
import ListingCard from './ListingCard'

export default function ListingTabs({
  forSale,
  sold,
}: {
  forSale: Listing[]
  sold: Listing[]
}) {
  const [tab, setTab] = useState<'forsale' | 'sold'>('forsale')

  return (
    <>
      <div className="tabs">
        <button
          className={`tab-btn${tab === 'forsale' ? ' active' : ''}`}
          onClick={() => setTab('forsale')}
        >
          For Sale
        </button>
        <button
          className={`tab-btn${tab === 'sold' ? ' active' : ''}`}
          onClick={() => setTab('sold')}
        >
          Recently Sold
        </button>
      </div>

      <div className={`listing-grid tab-panel${tab === 'forsale' ? ' active' : ''}`}>
        {forSale.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>

      <div className={`listing-grid tab-panel${tab === 'sold' ? ' active' : ''}`}>
        {sold.map((listing) => (
          <ListingCard key={listing.id} {...listing} />
        ))}
      </div>
    </>
  )
}
