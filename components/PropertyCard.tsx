import Link from 'next/link'
import type { Property } from '@/lib/content'

function formatPrice(value: unknown): string | null {
  const amount = typeof value === 'string' ? Number(value) : value
  if (typeof amount !== 'number' || Number.isNaN(amount)) return null
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

export default function PropertyCard({ property }: { property: Property }) {
  const meta = property.metadata ?? {}
  const price = formatPrice(meta.price ?? meta.list_price ?? meta.asking_price)
  const location = meta.neighborhood ?? meta.city ?? meta.address ?? null
  const beds = meta.bedrooms
  const baths = meta.bathrooms
  const sqft = meta.square_feet ?? meta.square_footage

  const facts = [
    typeof beds === 'number' || typeof beds === 'string' ? `${beds} bd` : null,
    typeof baths === 'number' || typeof baths === 'string' ? `${baths} ba` : null,
    typeof sqft === 'number' ? `${sqft.toLocaleString('en-US')} sqft` : null,
  ].filter(Boolean) as string[]

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
    >
      {property.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${property.thumbnail}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={property.title}
          width={800}
          height={600}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-52 w-full items-center justify-center bg-gray-50 text-3xl">🏠</div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {price ? <p className="text-lg font-bold text-gray-900">{price}</p> : null}

        <h2 className="mt-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-rose-500">
          {property.title}
        </h2>

        {typeof location === 'string' ? (
          <p className="mt-1 text-sm text-gray-600">{location}</p>
        ) : null}

        {facts.length > 0 ? (
          <p className="mt-3 text-sm text-gray-500">{facts.join(' · ')}</p>
        ) : null}
      </div>
    </Link>
  )
}
