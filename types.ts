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
    /** @deprecated Legacy alias for `cover_image`; kept so older consumers still compile. */
    image?: CosmicFile
    cover_image?: CosmicFile
  }
}

// ----------------------------
// Hosts
// ----------------------------

export interface Host extends CosmicObject {
  type: 'hosts'
  metadata: {
    // Cosmic stores the host's display name under `name`.
    name?: string
    /** @deprecated Legacy alias for `name`; kept so older consumers still compile. */
    full_name?: string
    bio?: string
    avatar?: CosmicFile
    superhost?: boolean
    // Stored as a number (e.g. 92, 99) but tolerate string values too.
    response_rate?: number | string
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
    // Cosmic stores the display title under `listing_title`.
    listing_title?: string
    description?: string
    property_type?: string
    // Multi-object metafield, so this is an array.
    categories?: Category[]
    host?: Host
    // Single free-text location field (e.g. "Joshua Tree, California").
    location?: string
    price_per_night?: number
    bedrooms?: number
    bathrooms?: number
    max_guests?: number
    amenities?: string[]
    // Files metafield holding the listing photos.
    gallery?: CosmicFile[]
    instant_book?: boolean

    /** @deprecated Legacy alias for `categories`; kept so older consumers still compile. */
    category?: Category
    /** @deprecated Legacy alias for `location`; kept so older consumers still compile. */
    address?: string
    /** @deprecated Legacy alias for `location`; kept so older consumers still compile. */
    city?: string
    /** @deprecated Legacy alias for `location`; kept so older consumers still compile. */
    country?: string
    /** @deprecated Legacy alias for `gallery`; kept so older consumers still compile. */
    images?: CosmicFile[]
    /** @deprecated Legacy alias for the first `gallery` image. */
    featured_image?: CosmicFile

    // Not stored on the object; ratings are derived from related reviews.
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
    // Stored as a select with values "1" through "5", so it arrives as a
    // string. Coerce with Number() before doing arithmetic on it.
    rating?: number | string
    review_text?: string
    stay_date?: string

    /** @deprecated Legacy alias for `review_text`; kept so older consumers still compile. */
    comment?: string
    /** @deprecated Legacy alias for `stay_date`; kept so older consumers still compile. */
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
