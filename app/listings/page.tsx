import { Suspense } from 'react'
import FilterBar from '@/components/FilterBar'
import ListingGrid from '@/components/ListingGrid'
import { getCategories, getListings, getMetafieldValue } from '@/lib/cosmic'

interface ListingsPageProps {
  searchParams: Promise<{
    category?: string
    property_type?: string
    min_price?: string
    max_price?: string
    amenities?: string
    location?: string
    guests?: string
  }>
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams
  const [categories, allListings] = await Promise.all([getCategories(), getListings()])

  const propertyTypes = Array.from(
    new Set(
      allListings
        .map((listing) => getMetafieldValue(listing.metadata?.property_type))
        .filter((value) => value.length > 0)
    )
  ).sort()

  const amenitiesOptions = Array.from(
    new Set(allListings.flatMap((listing) => listing.metadata?.amenities || []))
  ).sort()

  const selectedAmenities = params.amenities ? params.amenities.split(',').filter(Boolean) : []

  const filteredListings = allListings.filter((listing) => {
    if (params.category) {
      const listingCategories = listing.metadata?.categories || []
      const matches = listingCategories.some(
        (cat) => cat.slug === params.category || cat.id === params.category
      )
      if (!matches) return false
    }

    if (params.property_type) {
      const type = getMetafieldValue(listing.metadata?.property_type)
      if (type !== params.property_type) return false
    }

    const price = listing.metadata?.price_per_night || 0
    if (params.min_price && price < Number(params.min_price)) return false
    if (params.max_price && price > Number(params.max_price)) return false

    if (selectedAmenities.length > 0) {
      const listingAmenities = listing.metadata?.amenities || []
      const hasAll = selectedAmenities.every((amenity) => listingAmenities.includes(amenity))
      if (!hasAll) return false
    }

    if (params.location) {
      const location = getMetafieldValue(listing.metadata?.location).toLowerCase()
      if (!location.includes(params.location.toLowerCase())) return false
    }

    if (params.guests) {
      const maxGuests = listing.metadata?.max_guests || 0
      if (maxGuests < Number(params.guests)) return false
    }

    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">All listings</h1>
      <p className="text-gray-600 mb-8">
        {filteredListings.length} stay{filteredListings.length === 1 ? '' : 's'} found
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={<div className="lg:w-72 shrink-0" />}>
          <FilterBar categories={categories} propertyTypes={propertyTypes} amenitiesOptions={amenitiesOptions} />
        </Suspense>
        <div className="flex-1">
          <ListingGrid
            listings={filteredListings}
            emptyMessage="No listings match your filters. Try adjusting your search."
          />
        </div>
      </div>
    </div>
  )
}