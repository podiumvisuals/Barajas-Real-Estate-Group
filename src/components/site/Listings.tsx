import { getPayloadClient } from '@/lib/payload'
import ListingTabs from './ListingTabs'

export default async function Listings() {
  const payload = await getPayloadClient()

  const [forSale, sold] = await Promise.all([
    payload.find({ collection: 'listings', where: { status: { equals: 'for_sale' } }, limit: 4 }),
    payload.find({ collection: 'listings', where: { status: { equals: 'sold' } }, limit: 4 }),
  ])

  return (
    <section className="section" id="listings">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="kicker">Property Portfolio</span>
            <h2>Listings &amp; Sales</h2>
          </div>
          <p>A sample of Lily&apos;s active listings and recent closings — full search connects live once IDX is set up.</p>
        </div>

        <ListingTabs forSale={forSale.docs} sold={sold.docs} />

        <a href="#" className="view-all">
          View All Listings &amp; Sales →
        </a>
      </div>
    </section>
  )
}
