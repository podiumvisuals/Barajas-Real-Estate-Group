import type { Block } from 'payload'

export const BeforeAfterTile: Block = {
  slug: 'beforeAfterTile',
  labels: {
    singular: 'Before/After Tile',
    plural: 'Before/After Tiles',
  },
  fields: [
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
  ],
}
