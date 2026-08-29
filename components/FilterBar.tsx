'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useState } from 'react'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface FilterBarProps {
  categories: Category[]
  propertyTypes: string[]
  amenitiesOptions: string[]
}

export default function FilterBar({ categories, propertyTypes, amenitiesOptions }: FilterBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [propertyType, setPropertyType] = useState(searchParams.get('property_type') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') || '')
  const [amenities, setAmenities] = useState<string[]>(
    searchParams.get('amenities') ? searchParams.get('amenities')!.split(',').filter(Boolean) : []
  )

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    if (propertyType) params.set('property_type', propertyType)
    if (minPrice) params.set('min_price', minPrice)
    if (maxPrice) params.set('max_price', maxPrice)
    if (amenities.length > 0) params.set('amenities', amenities.join(','))

    const existingLocation = searchParams.get('location')
    const existingGuests = searchParams.get('guests')
    if (existingLocation) params.set('location', existingLocation)
    if (existingGuests) params.set('guests', existingGuests)

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearFilters = () => {
    setCategory('')
    setPropertyType('')
    setMinPrice('')
    setMaxPrice('')
    setAmenities([])
    router.push(pathname)
  }

  return (
    <aside className="lg:w-72 shrink-0 bg-white border border-gray-100 rounded-2xl p-6 h-fit lg:sticky lg:top-24 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <option value="">All categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {getMetafieldValue(cat.metadata?.name) || cat.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Property type</label>
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
        >
          <option value="">All types</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Price per night</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
        </div>
      </div>

      {amenitiesOptions.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {amenitiesOptions.map((amenity) => (
              <label key={amenity} className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={amenities.includes(amenity)}
                  onChange={() => toggleAmenity(amenity)}
                  className="rounded border-gray-300 text-rose-500 focus:ring-rose-400"
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button
          onClick={applyFilters}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-2.5 rounded-xl transition-colors"
        >
          Apply filters
        </button>
        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 rounded-xl transition-colors"
        >
          Clear filters
        </button>
      </div>
    </aside>
  )
}