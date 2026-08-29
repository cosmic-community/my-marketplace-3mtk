import CategoryCard from '@/components/CategoryCard'
import type { Category } from '@/types'

export default function CategoryRow({ categories }: { categories: Category[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}