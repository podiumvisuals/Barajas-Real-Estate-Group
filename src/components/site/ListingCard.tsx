import Image from 'next/image'

import type { Listing } from '@/payload-types'
import { formatPrice } from '@/lib/format'
import { mediaAlt, mediaUrl } from '@/lib/media'

export default function ListingCard({
  photo,
  address,
  price,
  badgeText,
  badgeStyle,
  beds,
  baths,
  sqft,
  representationType,
  soldTimeAgoLabel,
  status,
}: Listing) {
  const url = mediaUrl(photo)

  return (
    <div className="listing-card">
      <div className="listing-media">
        {url && (
          <Image
            src={url}
            alt={mediaAlt(photo, address)}
            width={400}
            height={190}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <span className={`badge ${badgeStyle}`}>{badgeText}</span>
      </div>
      <div className="listing-body">
        <div className="listing-price">{formatPrice(price)}</div>
        <div className="listing-addr">{address}</div>
        <div className="listing-meta">
          {status === 'for_sale' ? (
            <>
              {beds != null && <span>{beds} bd</span>}
              {baths != null && <span>{baths} ba</span>}
              {sqft != null && <span>{sqft.toLocaleString()} sqft</span>}
            </>
          ) : (
            <>
              {representationType && (
                <span>Represented {representationType === 'buyer' ? 'Buyer' : 'Seller'}</span>
              )}
              {soldTimeAgoLabel && <span>{soldTimeAgoLabel}</span>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
