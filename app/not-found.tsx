import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <p className="text-6xl mb-4">🏝️</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-600 mb-8">We couldn&apos;t find the page you&apos;re looking for.</p>
      <Link
        href="/"
        className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-3 rounded-full transition-colors"
      >
        Back to home
      </Link>
    </div>
  )
}