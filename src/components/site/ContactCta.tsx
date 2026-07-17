import { getPayloadClient } from '@/lib/payload'
import ContactForm from './ContactForm'

export default async function ContactCta() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const forms = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Contact Form' } },
    limit: 1,
  })

  return (
    <section id="contact">
      <div className="cta">
        <div className="cta-grid">
          <div>
            <h2>Ready to make your next move?</h2>
            <p>
              Whether you&apos;re buying your first home, selling to upsize, or growing an investment
              portfolio — {settings.brandName} is ready to help.
            </p>
            <div className="cta-info">
              <div>
                <b>Phone</b> &nbsp; {settings.phone}
              </div>
              <div>
                <b>Email</b> &nbsp; {settings.email}
              </div>
              <div>
                <b>Office</b> &nbsp; {settings.officeAddress}
              </div>
            </div>
          </div>
          <div className="cta-form">
            <ContactForm form={forms.docs[0] ?? null} />
          </div>
        </div>
      </div>
    </section>
  )
}
