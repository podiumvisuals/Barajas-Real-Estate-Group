import type { GlobalConfig } from 'payload'

import { isAdminOrEditor } from '../access/isAdminOrEditor'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description: 'Branding, navigation, footer, contact info, and service areas shown across the whole site.',
  },
  access: {
    read: () => true,
    update: isAdminOrEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            { name: 'brandName', type: 'text', required: true },
            { name: 'brandSubline', type: 'text', required: true },
            { name: 'favicon', type: 'upload', relationTo: 'media' },
            { name: 'ogImage', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Navigation',
          fields: [
            {
              name: 'navLinks',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true },
              ],
            },
            { name: 'headerCtaLabel', type: 'text', required: true },
            { name: 'headerCtaHref', type: 'text', required: true },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text', required: true },
            { name: 'email', type: 'email', required: true },
            { name: 'officeAddress', type: 'text', required: true },
          ],
        },
        {
          label: 'Service Areas',
          fields: [
            {
              name: 'serviceAreas',
              type: 'array',
              fields: [{ name: 'area', type: 'text', required: true }],
            },
          ],
        },
        {
          label: 'Social & Footer',
          fields: [
            {
              name: 'socialLinks',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
              ],
            },
            { name: 'copyrightLine', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
