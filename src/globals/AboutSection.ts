import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const AboutSection: GlobalConfig = {
  slug: 'about-section',
  label: 'About Section',
  admin: {
    description: 'Agent bio, photo, and specialties shown in the "Meet Your Agent" section.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    { name: 'photo', type: 'upload', relationTo: 'media', required: true },
    {
      type: 'row',
      fields: [
        { name: 'rating', type: 'number', required: true, defaultValue: 5, min: 0, max: 5 },
        { name: 'reviewCount', type: 'number', required: true, min: 0 },
      ],
    },
    { name: 'kicker', type: 'text', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'bio', type: 'richText', required: true },
    {
      name: 'specialties',
      type: 'array',
      admin: { description: 'Chips shown under the bio, e.g. "Buyer\'s Agent", "Listing Agent".' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'languages',
      type: 'array',
      fields: [{ name: 'language', type: 'text', required: true }],
    },
    {
      type: 'row',
      fields: [
        { name: 'brokerage', type: 'text', required: true },
        { name: 'brokerageLocation', type: 'text', required: true },
      ],
    },
  ],
}
