import type { CollectionConfig } from 'payload'

import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const Listings: CollectionConfig = {
  slug: 'listings',
  labels: {
    singular: 'Listing',
    plural: 'Listings',
  },
  admin: {
    useAsTitle: 'address',
    defaultColumns: ['address', 'status', 'price', 'featured'],
    description:
      'Properties shown in the "For Sale" / "Recently Sold" tabs. Mark exactly one as Featured to show it on the homepage hero.',
  },
  access: {
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  orderable: true,
  fields: [
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'for_sale',
      options: [
        { label: 'For Sale', value: 'for_sale' },
        { label: 'Recently Sold', value: 'sold' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Shows this listing in the homepage hero as the featured property. Only one listing should be featured at a time — marking a new one automatically un-marks the previous one.',
        position: 'sidebar',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'badgeText',
      type: 'text',
      required: true,
      admin: {
        description:
          'Small tag shown on the photo, e.g. "27 Days on Market", "Price Cut $25K", "Open Fri 4–6pm", "Sold".',
      },
    },
    {
      name: 'badgeStyle',
      type: 'select',
      required: true,
      defaultValue: 'dark',
      options: [
        { label: 'Dark', value: 'dark' },
        { label: 'Accent (gold)', value: 'accent' },
        { label: 'Outline', value: 'outline' },
      ],
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Dollar amount, no commas or symbols, e.g. 1299000.',
      },
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      admin: {
        description: 'Full display address as one line, e.g. "18147 Gallineta St, Rowland Heights, CA".',
      },
    },
    {
      name: 'beds',
      type: 'number',
      min: 0,
      admin: {
        condition: (data) => data?.status === 'for_sale',
      },
    },
    {
      name: 'baths',
      type: 'number',
      min: 0,
      admin: {
        condition: (data) => data?.status === 'for_sale',
      },
    },
    {
      name: 'sqft',
      type: 'number',
      min: 0,
      admin: {
        condition: (data) => data?.status === 'for_sale',
      },
    },
    {
      name: 'representationType',
      type: 'select',
      options: [
        { label: 'Represented Buyer', value: 'buyer' },
        { label: 'Represented Seller', value: 'seller' },
      ],
      admin: {
        condition: (data) => data?.status === 'sold',
      },
    },
    {
      name: 'soldTimeAgoLabel',
      type: 'text',
      admin: {
        description: 'Free text, e.g. "30 days ago", "3 months ago".',
        condition: (data) => data?.status === 'sold',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        description: 'Optional link to the full listing detail page (MLS/IDX), once available.',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, originalDoc }) => {
        if (data.featured && !originalDoc?.featured) {
          await req.payload.update({
            collection: 'listings',
            where: {
              and: [
                { featured: { equals: true } },
                ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
              ],
            },
            data: { featured: false },
            req,
          })
        }
        return data
      },
    ],
  },
}
