import { getPayloadClient } from '@/lib/payload'

export default async function ServiceAreasBar() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <section className="areas-bar">
      <div className="wrap">
        <span className="areas-label">Serving</span>
        <span className="areas-list">
          {(settings.serviceAreas ?? []).map((a) => a.area).join(' · ')}
        </span>
      </div>
    </section>
  )
}
