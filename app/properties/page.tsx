import type { Metadata } from 'next'
import PropertyCard from '@/components/PropertyCard'
import EmptyState from '@/components/EmptyState'
import { getProperties } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Properties - My Marketplace',
  description: 'Browse homes for sale across San Francisco and Los Angeles.',
}

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties</h1>
      <p className="text-gray-600 mb-8">Homes for sale across San Francisco and Los Angeles.</p>

      {properties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <EmptyState message="No properties available yet." />
      )}
    </div>
  )
}
