import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero Section',
  admin: {
    description: 'The top banner of the homepage, including the headline, search bar note, and stat tiles.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    { name: 'eyebrowText', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'headlinePre', type: 'text', admin: { description: 'Text before the emphasized phrase.' } },
        {
          name: 'headlineEmphasis',
          type: 'text',
          required: true,
          admin: { description: 'The emphasized (highlighted) phrase.' },
        },
        { name: 'headlinePost', type: 'text', admin: { description: 'Text after the emphasized phrase.' } },
      ],
    },
    { name: 'leadParagraph', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'primaryCtaLabel', type: 'text', required: true },
        { name: 'primaryCtaHref', type: 'text', required: true },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'secondaryCtaLabel', type: 'text', required: true },
        { name: 'secondaryCtaHref', type: 'text', required: true },
      ],
    },
    {
      name: 'searchBarNote',
      type: 'text',
      admin: {
        description: 'Small note under the search bar, e.g. explaining IDX search is coming soon.',
      },
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      admin: {
        description: 'Exactly 4 stat tiles, e.g. "87" / "Homes Sold".',
      },
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
