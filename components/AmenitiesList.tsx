export default function AmenitiesList({ amenities }: { amenities: string[] }) {
  if (!amenities || amenities.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {amenities.map((amenity) => (
        <div key={amenity} className="flex items-center gap-2 text-gray-700">
          <span className="text-rose-500">✓</span>
          <span>{amenity}</span>
        </div>
      ))}
    </div>
  )
}