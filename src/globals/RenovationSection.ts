import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access/isAdminOrEditor'
import { BeforeAfterTile } from '../blocks/BeforeAfterTile'
import { PhotoTile } from '../blocks/PhotoTile'
import { VideoTile } from '../blocks/VideoTile'

const ICON_OPTIONS = [
  { label: 'Wrench', value: 'wrench' },
  { label: 'House', value: 'house' },
  { label: 'Blueprint', value: 'blueprint' },
  { label: 'Hammer', value: 'hammer' },
  { label: 'Dollar Sign', value: 'dollar' },
  { label: 'Checklist', value: 'checklist' },
  { label: 'Key', value: 'key' },
]

export const RenovationSection: GlobalConfig = {
  slug: 'renovation-section',
  label: 'Renovation Section',
  admin: {
    description: 'The "Renovation & Distressed Property Experts" section.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    { name: 'kicker', type: 'text', required: true },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea', required: true },
    {
      name: 'features',
      type: 'array',
      admin: { description: '3 feature blocks recommended.' },
      fields: [
        { name: 'icon', type: 'select', required: true, options: ICON_OPTIONS },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'galleryTiles',
      type: 'blocks',
      admin: {
        description: 'Before/after, photo, or video tiles for the renovation gallery. Add, remove, or reorder freely.',
      },
      blocks: [BeforeAfterTile, PhotoTile, VideoTile],
    },
    {
      name: 'note',
      type: 'text',
      admin: {
        description: 'Small italic note under the gallery, e.g. flagging placeholder content.',
      },
    },
    { name: 'bannerHeading', type: 'text', required: true },
    { name: 'bannerText', type: 'textarea', required: true },
    { name: 'bannerCtaLabel', type: 'text', required: true },
    { name: 'bannerCtaHref', type: 'text', required: true },
  ],
}
