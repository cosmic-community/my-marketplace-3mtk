import ListingCard from '@/components/ListingCard'
import EmptyState from '@/components/EmptyState'
import type { Listing } from '@/types'

interface ListingGridProps {
  listings: Listing[]
  emptyMessage?: string
}

export default function ListingGrid({ listings, emptyMessage = 'No listings found.' }: ListingGridProps) {
  if (!listings || listings.length === 0) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}