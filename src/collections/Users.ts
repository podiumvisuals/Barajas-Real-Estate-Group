import type { CollectionConfig } from 'payload'

import { isAdmin } from '../access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: isAdmin,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin (Podium Visuals)', value: 'admin' },
        { label: 'Editor (Client)', value: 'editor' },
      ],
      admin: {
        description:
          'Admins can manage other users. Editors can edit all site content but cannot manage user accounts.',
      },
    },
  ],
}
