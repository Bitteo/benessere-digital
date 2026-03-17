import type { CollectionConfig } from 'payload'

export const Creators: CollectionConfig = {
  slug: 'creators',
  admin: {
    useAsTitle: 'handle',
    defaultColumns: ['handle', 'name', 'featured', 'updatedAt'],
  },
  fields: [
    {
      name: 'handle',
      type: 'text',
      required: true,
      label: 'Handle (e.g. @virginia.gambardella)',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
    },
    {
      name: 'platforms',
      type: 'array',
      label: 'Platforms',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Other', value: 'other' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          label: 'Profile URL',
        },
      ],
    },
    {
      name: 'tiktokEmbedUrl',
      type: 'text',
      label: 'TikTok Embed URL',
      admin: {
        description: 'Featured TikTok video embed URL for homepage display',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured on Homepage',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
