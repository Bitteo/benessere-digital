import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Authors } from './collections/Authors'
import { Articles } from './collections/Articles'
import { Pages } from './collections/Pages'
import { Apps } from './collections/Apps'
import { Books } from './collections/Books'
import { Creators } from './collections/Creators'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProduction = process.env.NODE_ENV === 'production'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Authors, Articles, Pages, Apps, Books, Creators],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-not-for-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // Support both DATABASE_URL (Neon/Vercel convention) and DATABASE_URI
      connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI || '',
    },
    // prodMigrations: on first production boot, push the full schema to the
    // empty Neon DB. pushDevSchema is tracked as a migration so it only runs
    // once; subsequent boots skip it because it's already in payload_migrations.
    prodMigrations: [
      {
        name: '0000_initial_schema_push',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        up: async ({ payload }: MigrateUpArgs) => {
          process.env.PAYLOAD_FORCE_DRIZZLE_PUSH = 'true'
          const { pushDevSchema } = await import('@payloadcms/drizzle')
          await pushDevSchema(payload.db as Parameters<typeof pushDevSchema>[0])
          delete process.env.PAYLOAD_FORCE_DRIZZLE_PUSH
        },
        down: async (_args: MigrateDownArgs) => {
          // No-op: we never roll back the initial schema in production
        },
      },
    ],
  }),
  sharp,
  plugins: [
    ...(isProduction && process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB
    },
  },
})
