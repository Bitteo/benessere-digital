import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

export const dynamic = 'force-dynamic'
import { importMap } from '../importMap'
import config from '@payload-config'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams })
}

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  return RootPage({ config, importMap, params, searchParams })
}
