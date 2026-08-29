import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold">
            <span>🏡</span>
            <span>My Marketplace</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/listings" className="hover:text-rose-500 transition-colors">
              Listings
            </Link>
            <Link href="/hosts" className="hover:text-rose-500 transition-colors">
              Hosts
            </Link>
          </nav>
        </div>
        <p className="text-center sm:text-left text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} My Marketplace. All rights reserved.
        </p>
      </div>
    </footer>
  )
}