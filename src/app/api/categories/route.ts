import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/content'

export async function GET() {
  const docs = await getCategories()
  return NextResponse.json({
    docs,
    totalDocs: docs.length,
    totalPages: 1,
    page: 1,
  })
}
