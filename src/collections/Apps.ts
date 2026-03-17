import type { CollectionConfig } from 'payload'

export const Apps: CollectionConfig = {
  slug: 'apps',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'useCase', 'featured', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'App Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'URL-friendly identifier, e.g. "bepresent"',
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'useCase',
      type: 'text',
      label: 'Use Case / Category',
      admin: {
        description: 'e.g. "Focus / Wellbeing", "Productivity / ADHD"',
      },
    },
    {
      name: 'appStoreUrl',
      type: 'text',
      label: 'App Store URL (iOS)',
    },
    {
      name: 'playStoreUrl',
      type: 'text',
      label: 'Play Store URL (Android)',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'App Icon',
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
