// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ListingGrid from '@/components/ListingGrid'
import { getCategoryBySlug, getListingsByCategoryId, getMetafieldValue } from '@/lib/cosmic'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const listings = await getListingsByCategoryId(category.id)
  const coverImage = category.metadata?.cover_image
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const icon = getMetafieldValue(category.metadata?.icon)
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div>
      <div className="relative h-56 sm:h-72 bg-gray-100 overflow-hidden">
        {coverImage && (
          <img
            src={`${coverImage.imgix_url}?w=2000&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={1000}
            height={300}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
              {icon && <span>{icon}</span>}
              {name}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {description && <p className="text-gray-600 max-w-2xl mb-8">{description}</p>}
        <ListingGrid listings={listings} emptyMessage="No listings in this category yet." />
      </div>
    </div>
  )
}