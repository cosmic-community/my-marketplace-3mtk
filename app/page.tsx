import Link from 'next/link'
import HeroSearch from '@/components/HeroSearch'
import CategoryRow from '@/components/CategoryRow'
import ListingGrid from '@/components/ListingGrid'
import { getCategories, getListings } from '@/lib/cosmic'

export default async function HomePage() {
  const [categories, listings] = await Promise.all([getCategories(), getListings()])
  const featuredListings = listings.slice(0, 6)

  return (
    <div>
      <section className="relative bg-gradient-to-br from-rose-50 via-white to-orange-50 py-16 sm:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            Find your next <span className="text-rose-500">getaway</span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Unique homes, curated hosts, unforgettable stays. Search thousands of vacation rentals around the world.
          </p>
          <HeroSearch />
        </div>
      </section>

      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by category</h2>
          <CategoryRow categories={categories} />
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured stays</h2>
          <Link href="/listings" className="text-rose-500 font-medium text-sm hover:underline">
            View all listings →
          </Link>
        </div>
        <ListingGrid listings={featuredListings} emptyMessage="No listings available yet." />
      </section>
    </div>
  )
}