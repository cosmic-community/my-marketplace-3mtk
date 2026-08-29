import { createBucketClient } from '@cosmicjs/sdk'
import type { Category, Host, Listing, Review } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely extract a plain string value from a metadata field that may be
// a string, number, boolean, or a legacy { key, value } object.
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

const PROPS = ['id', 'slug', 'title', 'content', 'metadata', 'type', 'created_at', 'modified_at']

// ----------------------------
// Categories
// ----------------------------

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(PROPS)
      .depth(1)

    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(PROPS)
      .depth(1)

    return (response.object as Category) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch category')
  }
}

// ----------------------------
// Hosts
// ----------------------------

export async function getHosts(): Promise<Host[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'hosts' })
      .props(PROPS)
      .depth(1)

    return response.objects as Host[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch hosts')
  }
}

export async function getHostBySlug(slug: string): Promise<Host | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'hosts', slug })
      .props(PROPS)
      .depth(1)

    return (response.object as Host) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch host')
  }
}

// ----------------------------
// Listings
// ----------------------------

export interface ListingFilters {
  category?: string
  propertyType?: string
  amenities?: string[]
  minPrice?: number
  maxPrice?: number
  guests?: number
  search?: string
  limit?: number
  [key: string]: any
}

export async function getListings(filters: ListingFilters = {}): Promise<Listing[]> {
  try {
    const query: Record<string, any> = { type: 'listings' }

    if (filters.category) {
      query['metadata.category'] = filters.category
    }

    if (filters.propertyType) {
      query['metadata.property_type'] = filters.propertyType
    }

    const response = await cosmic.objects
      .find(query)
      .props(PROPS)
      .depth(1)

    let listings = response.objects as Listing[]

    if (filters.amenities && filters.amenities.length > 0) {
      const requiredAmenities = filters.amenities
      listings = listings.filter((listing) => {
        const listingAmenities = listing.metadata?.amenities || []
        return requiredAmenities.every((a) => listingAmenities.includes(a))
      })
    }

    if (filters.minPrice !== undefined) {
      const minPrice = filters.minPrice
      listings = listings.filter((l) => (l.metadata?.price_per_night || 0) >= minPrice)
    }

    if (filters.maxPrice !== undefined) {
      const maxPrice = filters.maxPrice
      listings = listings.filter((l) => (l.metadata?.price_per_night || 0) <= maxPrice)
    }

    if (filters.guests !== undefined) {
      const guests = filters.guests
      listings = listings.filter((l) => (l.metadata?.max_guests || 0) >= guests)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      listings = listings.filter((l) => {
        const city = getMetafieldValue(l.metadata?.city).toLowerCase()
        const country = getMetafieldValue(l.metadata?.country).toLowerCase()
        return (
          l.title.toLowerCase().includes(searchLower) ||
          city.includes(searchLower) ||
          country.includes(searchLower)
        )
      })
    }

    // Manual sort - newest first
    listings = listings.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime()
      const dateB = new Date(b.created_at || '').getTime()
      return dateB - dateA
    })

    if (filters.limit) {
      listings = listings.slice(0, filters.limit)
    }

    return listings
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings')
  }
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'listings', slug })
      .props(PROPS)
      .depth(1)

    return (response.object as Listing) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch listing')
  }
}

export async function getListingsByHostId(hostId: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings', 'metadata.host': hostId })
      .props(PROPS)
      .depth(1)

    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings for host')
  }
}

export async function getListingsByCategoryId(categoryId: string): Promise<Listing[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'listings', 'metadata.category': categoryId })
      .props(PROPS)
      .depth(1)

    return response.objects as Listing[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch listings for category')
  }
}

// ----------------------------
// Reviews
// ----------------------------

export async function getReviewsByListingId(listingId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.listing': listingId })
      .props(PROPS)
      .depth(1)

    const reviews = response.objects as Review[]

    return reviews.sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime()
      const dateB = new Date(b.created_at || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}