// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// File metafield shape returned by Cosmic
export interface CosmicFile {
  url: string
  imgix_url: string
}

// ----------------------------
// Categories
// ----------------------------

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    icon?: string
    image?: CosmicFile
  }
}

// ----------------------------
// Hosts
// ----------------------------

export interface Host extends CosmicObject {
  type: 'hosts'
  metadata: {
    full_name?: string
    bio?: string
    avatar?: CosmicFile
    superhost?: boolean
    response_rate?: string
    response_time?: string
    joined_date?: string
    location?: string
    verified?: boolean
    languages?: string[]
  }
}

// ----------------------------
// Listings
// ----------------------------

export type PropertyType =
  | 'Entire home'
  | 'Private room'
  | 'Shared room'
  | 'Hotel room'

export interface Listing extends CosmicObject {
  type: 'listings'
  metadata: {
    description?: string
    property_type?: string
    category?: Category
    host?: Host
    address?: string
    city?: string
    country?: string
    price_per_night?: number
    bedrooms?: number
    bathrooms?: number
    max_guests?: number
    amenities?: string[]
    images?: CosmicFile[]
    featured_image?: CosmicFile
    instant_book?: boolean
    rating?: number
    review_count?: number
    latitude?: number
    longitude?: number
  }
}

// ----------------------------
// Reviews
// ----------------------------

export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    listing?: Listing
    guest_name?: string
    guest_avatar?: CosmicFile
    rating?: number
    comment?: string
    review_date?: string
    host_response?: string
  }
}

// ----------------------------
// Type guards
// ----------------------------

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories'
}

export function isHost(obj: CosmicObject): obj is Host {
  return obj.type === 'hosts'
}

export function isListing(obj: CosmicObject): obj is Listing {
  return obj.type === 'listings'
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews'
}