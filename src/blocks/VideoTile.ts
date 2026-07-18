import type { Block } from 'payload'

export const VideoTile: Block = {
  slug: 'videoTile',
  labels: {
    singular: 'Video Tile',
    plural: 'Video Tiles',
  },
  fields: [
    {
      name: 'sourceType',
      type: 'select',
      required: true,
      defaultValue: 'url',
      options: [
        { label: 'YouTube / Vimeo link', value: 'url' },
        { label: 'Uploaded video file', value: 'upload' },
      ],
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'YouTube or Vimeo link.',
        condition: (_, siblingData) => siblingData?.sourceType === 'url',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.sourceType === 'upload',
      },
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
