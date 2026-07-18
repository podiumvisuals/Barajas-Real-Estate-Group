import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { getPayloadClient } from '@/lib/payload'
import { mediaAlt, mediaUrl } from '@/lib/media'

export default async function About() {
  const payload = await getPayloadClient()
  const about = await payload.findGlobal({ slug: 'about-section' })
  const testimonials = await payload.find({
    collection: 'testimonials',
    where: { featuredOnHomepage: { equals: true } },
    limit: 2,
  })

  const photoUrl = mediaUrl(about.photo)

  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-photo">
            {photoUrl && (
              <Image
                src={photoUrl}
                alt={mediaAlt(about.photo, about.name)}
                width={520}
                height={460}
                style={{ width: '100%', height: 460, objectFit: 'cover' }}
              />
            )}
            <div className="rating">
              <div>
                <div className="stars">{'★'.repeat(Math.round(about.rating))}</div>
                <div className="count">{about.reviewCount} verified reviews</div>
              </div>
              <div className="num">{about.rating.toFixed(1)}</div>
            </div>
          </div>
          <div className="about-body">
            <span
              className="kicker"
              style={{
                color: 'var(--accent)',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 10,
              }}
            >
              {about.kicker}
            </span>
            <h2>{about.name}</h2>
            <div className="about-bio">
              <RichText data={about.bio} />
            </div>
            <div className="chips">
              {(about.specialties ?? []).map((s, i) => (
                <span className="chip" key={i}>
                  {s.label}
                </span>
              ))}
            </div>
            <div className="lang">
              Speaks{' '}
              {(about.languages ?? []).map((l, i, arr) => (
                <span key={i}>
                  <b>{l.language}</b>
                  {i < arr.length - 1 ? (i === arr.length - 2 ? ' & ' : ', ') : ''}
                </span>
              ))}{' '}
              · {about.brokerage} · {about.brokerageLocation}
            </div>

            {testimonials.docs.length > 0 && (
              <div className="about-quotes">
                {testimonials.docs.map((t) => (
                  <div className="quote" key={t.id}>
                    <p>&quot;{t.quote}&quot;</p>
                    <span>
                      {'★'.repeat(t.rating)} {t.authorName} — {t.location}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
