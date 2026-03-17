import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>
        <p className="text-gray-600">Pagina non trovata.</p>
        <Link href="/" className="mt-4 inline-block text-brand-600 underline hover:text-brand-700">
          Torna alla homepage
        </Link>
      </div>
    </main>
  )
}
