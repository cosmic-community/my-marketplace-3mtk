import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryCard({ category }: { category: Category }) {
  const coverImage = category.metadata?.cover_image
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const icon = getMetafieldValue(category.metadata?.icon)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex-shrink-0 w-40 sm:w-48 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow bg-white"
    >
      <div className="h-28 sm:h-32 bg-gray-100 overflow-hidden">
        {coverImage ? (
          <img
            src={`${coverImage.imgix_url}?w=400&h=300&fit=crop&auto=format,compress`}
            alt={name}
            width={200}
            height={150}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">{icon || '🏠'}</div>
        )}
      </div>
      <div className="p-3">
        <p className="font-semibold text-gray-900 flex items-center gap-1.5 truncate">
          {icon && <span>{icon}</span>}
          {name}
        </p>
      </div>
    </Link>
  )
}