import Image from 'next/image'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { formatPrice } from '@/lib/format'
import { mediaAlt, mediaUrl } from '@/lib/media'
import SearchBar from './SearchBar'

export default async function Hero() {
  const payload = await getPayloadClient()
  const hero = await payload.findGlobal({ slug: 'hero-section' })

  const featured = await payload.find({
    collection: 'listings',
    where: { featured: { equals: true } },
    limit: 1,
  })
  const featuredListing = featured.docs[0]

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">
              <span className="dot" />
              {hero.eyebrowText}
            </div>
            <h1>
              {hero.headlinePre}{' '}
              <em>{hero.headlineEmphasis}</em> {hero.headlinePost}
            </h1>
            <p className="lead">{hero.leadParagraph}</p>
            <div className="hero-actions">
              <Link href={hero.primaryCtaHref} className="btn primary">
                {hero.primaryCtaLabel}
              </Link>
              <Link href={hero.secondaryCtaHref} className="btn outline">
                {hero.secondaryCtaLabel}
              </Link>
            </div>
          </div>

          {featuredListing && (
            <div className="hero-card">
              {mediaUrl(featuredListing.photo) && (
                <Image
                  src={mediaUrl(featuredListing.photo)!}
                  alt={mediaAlt(featuredListing.photo, featuredListing.address)}
                  width={800}
                  height={460}
                  style={{ width: '100%', height: 460, objectFit: 'cover' }}
                  priority
                />
              )}
              <span className="tag">Featured Listing</span>
              <div className="price-tag">
                <div className="p">{formatPrice(featuredListing.price)}</div>
                <div className="a">
                  {featuredListing.address}
                  {featuredListing.beds ? ` · ${featuredListing.beds} bd` : ''}
                  {featuredListing.baths ? ` · ${featuredListing.baths} ba` : ''}
                  {featuredListing.sqft ? ` · ${featuredListing.sqft.toLocaleString()} sqft` : ''}
                </div>
              </div>
            </div>
          )}
        </div>

        <SearchBar note={hero.searchBarNote ?? undefined} />

        <div className="hero-stats">
          {(hero.stats ?? []).map((stat, i) => (
            <div className="hstat" key={i}>
              <span className="n">{stat.number}</span>
              <span className="l">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
