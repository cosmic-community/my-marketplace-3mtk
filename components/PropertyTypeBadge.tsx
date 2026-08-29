export default function PropertyTypeBadge({ propertyType }: { propertyType: string }) {
  if (!propertyType) return null

  return (
    <span className="inline-flex items-center text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
      {propertyType}
    </span>
  )
}