import Link from 'next/link'
import type { Listing } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import InstantBookBadge from '@/components/InstantBookBadge'

export default function ListingCard({ listing }: { listing: Listing }) {
  const gallery = listing.metadata?.gallery || []
  const coverImage = gallery[0]
  const title = getMetafieldValue(listing.metadata?.listing_title) || listing.title
  const location = getMetafieldValue(listing.metadata?.location)
  const propertyType = getMetafieldValue(listing.metadata?.property_type)
  const price = listing.metadata?.price_per_night || 0

  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {coverImage ? (
          <img
            src={`${coverImage.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🏡</div>
        )}
        {listing.metadata?.instant_book && (
          <div className="absolute top-3 left-3">
            <InstantBookBadge />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-2 truncate">📍 {location}</p>
        {propertyType && <p className="text-xs font-medium text-gray-500 mb-2">{propertyType}</p>}
        <p className="text-gray-900">
          <span className="font-bold">${price}</span>
          <span className="text-sm text-gray-500"> / night</span>
        </p>
      </div>
    </Link>
  )
}