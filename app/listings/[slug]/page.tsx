// app/listings/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Gallery from '@/components/Gallery'
import AmenitiesList from '@/components/AmenitiesList'
import HostCard from '@/components/HostCard'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'
import InstantBookBadge from '@/components/InstantBookBadge'
import PropertyTypeBadge from '@/components/PropertyTypeBadge'
import { getListingBySlug, getReviewsByListingId, getMetafieldValue } from '@/lib/cosmic'

interface ListingPageProps {
  params: Promise<{ slug: string }>
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { slug } = await params
  const listing = await getListingBySlug(slug)

  if (!listing) {
    notFound()
  }

  const reviews = await getReviewsByListingId(listing.id)
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + (review.metadata?.rating || 0), 0) / reviews.length
      : 0

  const gallery = listing.metadata?.gallery || []
  const host = listing.metadata?.host
  const categories = listing.metadata?.categories || []
  const description = getMetafieldValue(listing.metadata?.description)
  const title = getMetafieldValue(listing.metadata?.listing_title) || listing.title
  const location = getMetafieldValue(listing.metadata?.location)
  const propertyType = getMetafieldValue(listing.metadata?.property_type)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-gray-600">
          <span>📍 {location}</span>
          {reviews.length > 0 && (
            <span className="flex items-center gap-1">
              <StarRating rating={averageRating} size="sm" />
              <span className="text-sm">
                ({reviews.length} review{reviews.length === 1 ? '' : 's'})
              </span>
            </span>
          )}
        </div>
      </div>

      {gallery.length > 0 && <Gallery images={gallery} title={title} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <PropertyTypeBadge propertyType={propertyType} />
            {listing.metadata?.instant_book && <InstantBookBadge />}
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
              >
                {getMetafieldValue(cat.metadata?.name) || cat.title}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-6 py-6 border-y border-gray-100 mb-6 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛏️</span>
              <span>
                {listing.metadata?.bedrooms || 0} bedroom{listing.metadata?.bedrooms === 1 ? '' : 's'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛁</span>
              <span>
                {listing.metadata?.bathrooms || 0} bathroom{listing.metadata?.bathrooms === 1 ? '' : 's'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">👥</span>
              <span>Up to {listing.metadata?.max_guests || 0} guests</span>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">About this place</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
          </div>

          {listing.metadata?.amenities && listing.metadata.amenities.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <AmenitiesList amenities={listing.metadata.amenities} />
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              Guest reviews
              {reviews.length > 0 && <StarRating rating={averageRating} size="sm" />}
            </h2>
            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet for this listing.</p>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mb-6">
            <p className="text-2xl font-bold text-gray-900 mb-1">
              ${listing.metadata?.price_per_night || 0}
              <span className="text-base font-normal text-gray-500"> / night</span>
            </p>
          </div>
          {host && <HostCard host={host} />}
        </div>
      </div>
    </div>
  )
}