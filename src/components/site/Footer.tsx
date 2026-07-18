import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'

export default async function Footer() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <footer>
      <div className="wrap foot-wrap">
        <span className="fname">{settings.brandName}</span>
        <div className="foot-links">
          {(settings.socialLinks ?? []).map((link, i) => (
            <Link key={i} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </Link>
          ))}
        </div>
        <span>{settings.copyrightLine}</span>
      </div>
    </footer>
  )
}
