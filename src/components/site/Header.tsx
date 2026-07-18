import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'

export default async function Header() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <header>
      <nav className="wrap">
        <div className="brand">
          <span className="name">{settings.brandName}</span>
          <span className="sub">{settings.brandSubline}</span>
        </div>
        <div className="navlinks">
          {(settings.navLinks ?? []).map((link, i) => (
            <Link key={i} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <Link href={settings.headerCtaHref} className="btn">
          {settings.headerCtaLabel}
        </Link>
      </nav>
    </header>
  )
}
