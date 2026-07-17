/**
 * One-time seed: populates a fresh database with the exact copy/content
 * that was live on the static index.html site, so the CMS launches with
 * real content instead of an empty admin panel. Run once against a fresh
 * database — re-running will create duplicate docs.
 *
 * Usage: npm run seed
 */
import config from '../src/payload.config'
import { getPayload } from 'payload'

function lexicalParagraph(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [{ type: 'text', version: 1, text }],
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

async function fetchAsFile(url: string, name: string) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`)
  const arrayBuffer = await res.arrayBuffer()
  return {
    data: Buffer.from(arrayBuffer),
    mimetype: res.headers.get('content-type') || 'image/jpeg',
    name,
    size: arrayBuffer.byteLength,
  }
}

async function run() {
  const payload = await getPayload({ config })

  console.log('Uploading placeholder media (sourced from Zillow — replace via /admin once real photos exist)...')

  const media = {
    coto: await payload.create({
      collection: 'media',
      data: { alt: 'Featured listing in Coto de Caza, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/fb0c259edd9e5316a6100abff583ef0c-p_h.jpg',
        'coto-de-caza.jpg',
      ),
    }),
    gallineta: await payload.create({
      collection: 'media',
      data: { alt: '18147 Gallineta St, Rowland Heights, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/6fe9adf1c4d4cd1861dbb9f621541721-p_h.jpg',
        'gallineta-st.jpg',
      ),
    }),
    ashiya: await payload.create({
      collection: 'media',
      data: { alt: '872 W Ashiya Rd, Montebello, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/7cbb7c84c6a01846d29e51e8b8c15e2b-p_h.jpg',
        'ashiya-rd.jpg',
      ),
    }),
    susan: await payload.create({
      collection: 'media',
      data: { alt: '1461 Susan Ln, La Habra, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/070257bdfdf94fc298311f1a3e1a4891-p_h.jpg',
        'susan-ln.jpg',
      ),
    }),
    cinco: await payload.create({
      collection: 'media',
      data: { alt: '4807 Cinco Vw, Whittier, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/f11fc4a2a9e8b5bf2bc017fa6a21b7f6-p_h.jpg',
        'cinco-vw.jpg',
      ),
    }),
    fifteenth: await payload.create({
      collection: 'media',
      data: { alt: '1626 E 15th St, Santa Ana, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/5a1f12c9eb463a023298f1bc50f6edbf-p_h.jpg',
        '15th-st.jpg',
      ),
    }),
    roanne: await payload.create({
      collection: 'media',
      data: { alt: '801 S Roanne St, Anaheim, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/d435b7aaeb88e75afefb5e0800bc749e-p_h.jpg',
        'roanne-st.jpg',
      ),
    }),
    elmwood: await payload.create({
      collection: 'media',
      data: { alt: '773 N Elmwood St, Orange, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/2416cbc46b36848bf1a84288cf894976-p_h.jpg',
        'elmwood-st.jpg',
      ),
    }),
    hiltonHead: await payload.create({
      collection: 'media',
      data: { alt: '22808 Hilton Head Dr #30, Diamond Bar, CA' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/4483507f08f47f2a31ab8c790a430b07-p_h.jpg',
        'hilton-head-dr.jpg',
      ),
    }),
    agent: await payload.create({
      collection: 'media',
      data: { alt: 'Lily Barajas, REALTOR®' },
      file: await fetchAsFile(
        'https://photos.zillowstatic.com/fp/0bce6a0984ecdd78ecac37dfe1c0ecef-h_l.jpg',
        'lily-barajas.jpg',
      ),
    }),
  }

  console.log('Populating Site Settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      brandName: 'Barajas Real Estate Group',
      brandSubline: 'Lily Barajas · REALTOR®',
      navLinks: [
        { label: 'Listings', href: '#listings' },
        { label: 'Renovation', href: '#renovate' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ],
      headerCtaLabel: 'Get Your Home Value',
      headerCtaHref: '#contact',
      phone: '(714) 350-9230',
      email: 'barajas.lily.re@gmail.com',
      officeAddress: '4000 Barranca Pkwy #105, Irvine, CA 92604',
      serviceAreas: [
        { area: 'Orange County' },
        { area: 'Riverside County' },
        { area: 'Los Angeles County' },
      ],
      socialLinks: [
        { platform: 'facebook', label: 'Facebook', url: '#' },
        { platform: 'linkedin', label: 'LinkedIn', url: '#' },
        { platform: 'instagram', label: 'Instagram', url: '#' },
      ],
      copyrightLine: '© 2026 Zutila, Inc. · CA DRE #1522444 · Equal Housing Opportunity',
    },
  })

  console.log('Populating Hero Section...')
  await payload.updateGlobal({
    slug: 'hero-section',
    data: {
      eyebrowText: "Orange & Riverside County · 5.0★ (25 reviews)",
      headlinePre: 'Find your next chapter with',
      headlineEmphasis: "Orange County's",
      headlinePost: 'most trusted guide home.',
      leadParagraph:
        'Lily Barajas has closed 87 homes and counting — helping buyers, sellers, and investors move with confidence across Irvine, Santa Ana, Anaheim, and beyond.',
      primaryCtaLabel: 'View Current Listings',
      primaryCtaHref: '#listings',
      secondaryCtaLabel: 'Talk to Lily',
      secondaryCtaHref: '#contact',
      searchBarNote: 'Live MLS search powered by IDX — pulls real-time listings once connected',
      stats: [
        { number: '87', label: 'Homes Sold' },
        { number: '19', label: 'Last 12 Months' },
        { number: '$1.1M', label: 'Average Sale Price' },
        { number: '5.0★', label: '25 Client Reviews' },
      ],
    },
  })

  console.log('Populating Renovation Section...')
  await payload.updateGlobal({
    slug: 'renovation-section',
    data: {
      kicker: 'Full-Service, Beyond the Sale',
      heading: 'Renovation & Distressed Property Experts',
      intro:
        'An in-house construction network — helping clients get homes sell-ready, rehab distressed properties, and maximize value before listing.',
      features: [
        {
          icon: 'wrench',
          title: 'Sell-Ready Makeovers',
          description:
            'Strategic, budget-conscious updates before you list — paint, flooring, staging-ready repairs — to maximize offers and days-on-market.',
        },
        {
          icon: 'house',
          title: 'Distressed & As-Is Purchases',
          description:
            'Inherited, damaged, or hard-to-sell property? We buy and rehab homes in any condition — no repairs needed on your end.',
        },
        {
          icon: 'blueprint',
          title: 'In-House Contractor Network',
          description:
            'Trusted contractors, designers, and permit guidance on call — so renovation budgeting and timelines are handled for you.',
        },
      ],
      galleryTiles: [
        {
          blockType: 'beforeAfterTile',
          beforeImage: media.gallineta.id,
          afterImage: media.ashiya.id,
          title: 'Full Kitchen Remodel',
          subtitle: 'Sample project placeholder',
        },
        {
          blockType: 'photoTile',
          image: media.susan.id,
          title: 'Whole-Home Rehab',
          subtitle: 'Add project photo',
        },
        {
          blockType: 'videoTile',
          sourceType: 'url',
          videoUrl: '',
          title: 'Property Walkthrough',
          subtitle: 'Add project video',
        },
      ],
      note: 'Placeholder gallery — swap in real before/after photos and a project walkthrough video once available.',
      bannerHeading: 'Looking to sell a distressed property?',
      bannerText:
        'We can help with that too — as-is purchases, rehab guidance, and a contractor network ready to get your property sell-ready.',
      bannerCtaLabel: 'Get a Renovation Consultation →',
      bannerCtaHref: '#contact',
    },
  })

  console.log('Populating About Section...')
  await payload.updateGlobal({
    slug: 'about-section',
    data: {
      photo: media.agent.id,
      rating: 5,
      reviewCount: 25,
      kicker: 'Meet Your Agent',
      name: 'Lily Barajas',
      bio: lexicalParagraph(
        "A knowledgeable and experienced REALTOR®, Lily stands out for her strong passion for helping buyers, sellers, and investors achieve their goals through a smooth, fulfilling experience. Whether you're upgrading, downsizing, flipping, or building generational wealth, Lily brings clarity and care to every transaction across Orange, Riverside, and Los Angeles counties.",
      ),
      specialties: [
        { label: "Buyer's Agent" },
        { label: 'Listing Agent' },
        { label: 'Relocation' },
        { label: 'Property Management' },
        { label: 'Investment Properties' },
        { label: 'Rentals' },
      ],
      languages: [{ language: 'English' }, { language: 'Spanish' }],
      brokerage: 'Zutila, Inc.',
      brokerageLocation: 'Irvine, CA',
    },
  })

  console.log('Creating Listings...')
  await payload.create({
    collection: 'listings',
    data: {
      status: 'for_sale',
      featured: true,
      photo: media.coto.id,
      badgeText: 'Featured',
      badgeStyle: 'accent',
      price: 2325000,
      address: '17 Brentwood, Coto De Caza, CA',
      beds: 5,
      baths: 4,
      sqft: 4000,
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'for_sale',
      photo: media.gallineta.id,
      badgeText: '27 Days on Market',
      badgeStyle: 'dark',
      price: 1299000,
      address: '18147 Gallineta St, Rowland Heights, CA',
      beds: 4,
      baths: 3,
      sqft: 2180,
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'for_sale',
      photo: media.ashiya.id,
      badgeText: 'Price Cut $25K',
      badgeStyle: 'accent',
      price: 1075000,
      address: '872 W Ashiya Rd, Montebello, CA',
      beds: 3,
      baths: 2,
      sqft: 1523,
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'for_sale',
      photo: media.susan.id,
      badgeText: '63 Days on Market',
      badgeStyle: 'dark',
      price: 1699000,
      address: '1461 Susan Ln, La Habra, CA',
      beds: 5,
      baths: 3,
      sqft: 2971,
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'for_sale',
      photo: media.cinco.id,
      badgeText: 'Open Fri 4–6pm',
      badgeStyle: 'outline',
      price: 1699000,
      address: '4807 Cinco Vw, Whittier, CA',
      beds: 5,
      baths: 4,
      sqft: 3218,
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'sold',
      photo: media.fifteenth.id,
      badgeText: 'Sold',
      badgeStyle: 'dark',
      price: 1105000,
      address: '1626 E 15th St, Santa Ana, CA',
      representationType: 'seller',
      soldTimeAgoLabel: '30 days ago',
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'sold',
      photo: media.roanne.id,
      badgeText: 'Sold',
      badgeStyle: 'dark',
      price: 935000,
      address: '801 S Roanne St, Anaheim, CA',
      representationType: 'buyer',
      soldTimeAgoLabel: '3 months ago',
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'sold',
      photo: media.elmwood.id,
      badgeText: 'Sold',
      badgeStyle: 'dark',
      price: 1400000,
      address: '773 N Elmwood St, Orange, CA',
      representationType: 'seller',
      soldTimeAgoLabel: '3 months ago',
    },
  })
  await payload.create({
    collection: 'listings',
    data: {
      status: 'sold',
      photo: media.hiltonHead.id,
      badgeText: 'Sold',
      badgeStyle: 'dark',
      price: 480000,
      address: '22808 Hilton Head Dr #30, Diamond Bar, CA',
      representationType: 'seller',
      soldTimeAgoLabel: '2 months ago',
    },
  })

  console.log('Creating Testimonials...')
  await payload.create({
    collection: 'testimonials',
    data: {
      quote:
        'I cannot recommend Lily Barajas enough to anyone looking to buy or sell a home. She went above and beyond in guiding us through the process from start to finish.',
      authorName: 'jacquiegm8',
      location: 'Jurupa Valley, CA',
      rating: 5,
      featuredOnHomepage: true,
    },
  })
  await payload.create({
    collection: 'testimonials',
    data: {
      quote:
        'Lily is one of the best realtors I have come across. She got the highest asking price for any unit in the complex.',
      authorName: 'miantili',
      location: 'Anaheim, CA',
      rating: 5,
      featuredOnHomepage: true,
    },
  })

  console.log('Creating Contact Form...')
  await payload.create({
    collection: 'forms',
    data: {
      title: 'Contact Form',
      submitButtonLabel: 'Contact Lily',
      confirmationType: 'message',
      confirmationMessage: lexicalParagraph('Thanks — Lily will be in touch soon.'),
      fields: [
        { blockType: 'text', name: 'name', label: 'Full name', required: true },
        { blockType: 'text', name: 'phone', label: 'Phone', required: false },
        { blockType: 'email', name: 'email', label: 'Email', required: true },
        { blockType: 'textarea', name: 'message', label: "Tell Lily what you're looking for...", required: true },
      ],
      emails: process.env.NOTIFY_EMAIL_TO
        ? [
            {
              emailTo: process.env.NOTIFY_EMAIL_TO,
              emailFrom: process.env.NOTIFY_EMAIL_FROM || process.env.NOTIFY_EMAIL_TO,
              subject: 'New contact form submission — Barajas Real Estate Group',
              message: lexicalParagraph('New lead: {{name}} ({{email}}, {{phone}}) — {{message}}'),
            },
          ]
        : [],
    },
  })

  console.log('Done. Note: the seeded photos (including the agent headshot) are placeholder')
  console.log('images sourced from real Zillow listings for demo purposes only — replace them')
  console.log('through /admin with photos Lily actually owns before treating the site as live.')

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
