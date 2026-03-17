import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'featured', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Book Title',
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
      name: 'author',
      type: 'text',
      required: true,
      label: 'Author',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      name: 'buyUrl',
      type: 'text',
      label: 'Purchase URL (Amazon EU)',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
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
