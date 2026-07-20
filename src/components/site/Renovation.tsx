import Image from 'next/image'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { mediaAlt, mediaUrl } from '@/lib/media'
import BeforeAfterSlider from './BeforeAfterSlider'
import Icon from './Icon'

export default async function Renovation() {
  const payload = await getPayloadClient()
  const reno = await payload.findGlobal({ slug: 'renovation-section' })

  return (
    <section className="section reno" id="renovate">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">{reno.kicker}</span>
            <h2>{reno.heading}</h2>
          </div>
          <p>{reno.intro}</p>
        </div>

        <div className="reno-feats">
          {(reno.features ?? []).map((feature, i) => (
            <div className="reno-feat" key={i}>
              <div className="icon">
                <Icon name={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="reno-grid">
          {(reno.galleryTiles ?? []).map((tile, i) => {
            if (tile.blockType === 'beforeAfterTile') {
              const beforeUrl = mediaUrl(tile.beforeImage)
              const afterUrl = mediaUrl(tile.afterImage)
              return (
                <div className="reno-tile big" key={i}>
                  <BeforeAfterSlider
                    beforeUrl={beforeUrl}
                    beforeAlt={mediaAlt(tile.beforeImage, `${tile.title} — before`)}
                    afterUrl={afterUrl}
                    afterAlt={mediaAlt(tile.afterImage, `${tile.title} — after`)}
                  />
                  <div className="lbl">
                    <div className="t">{tile.title}</div>
                    {tile.subtitle && <div className="s">{tile.subtitle}</div>}
                  </div>
                </div>
              )
            }

            if (tile.blockType === 'photoTile') {
              const url = mediaUrl(tile.image)
              return (
                <div
                  className={`reno-tile${url ? ' has-photo' : ''}`}
                  key={i}
                  style={url ? { backgroundImage: `url(${url})` } : undefined}
                >
                  <div className="lbl">
                    <div className="t">{tile.title}</div>
                    {tile.subtitle && <div className="s">{tile.subtitle}</div>}
                  </div>
                </div>
              )
            }

            // videoTile
            const href = tile.sourceType === 'url' ? tile.videoUrl : mediaUrl(tile.videoFile)
            return (
              <div className="reno-tile video" key={i}>
                <Link href={href ?? '#'} target="_blank" className="playbtn">
                  ▶
                </Link>
                <div className="video-caption">
                  <div className="t">{tile.title}</div>
                  {tile.subtitle && <div className="s">{tile.subtitle}</div>}
                </div>
              </div>
            )
          })}
        </div>
        {reno.note && <p className="reno-note">{reno.note}</p>}

        <div className="reno-banner">
          <div>
            <h3>{reno.bannerHeading}</h3>
            <p>{reno.bannerText}</p>
          </div>
          <Link href={reno.bannerCtaHref} className="btn">
            {reno.bannerCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
