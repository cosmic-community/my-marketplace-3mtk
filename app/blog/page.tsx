import type { Metadata } from 'next'
import BlogCard from '@/components/BlogCard'
import EmptyState from '@/components/EmptyState'
import { getBlogPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Blog - My Marketplace',
  description:
    'Market guides, neighborhood deep dives and investment insights for San Francisco and Los Angeles real estate.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
      <p className="text-gray-600 mb-8">
        Market guides, neighborhood deep dives and investment insights.
      </p>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState message="No blog posts published yet." />
      )}
    </div>
  )
}
