import type { Block } from 'payload'

export const PhotoTile: Block = {
  slug: 'photoTile',
  labels: {
    singular: 'Photo Tile',
    plural: 'Photo Tiles',
  },
  fields: [
    {
      name: 'image',
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
