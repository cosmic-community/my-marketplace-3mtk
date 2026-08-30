import Link from 'next/link'
import type { BlogPost } from '@/lib/content'

function formatDate(value?: string): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const publishedDate = formatDate(post.metadata?.published_date)
  const readTime = post.metadata?.read_time_minutes
  const market = post.metadata?.market

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-shadow hover:shadow-lg"
    >
      {post.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${post.thumbnail}?w=800&h=450&fit=crop&auto=format,compress`}
          alt={post.title}
          width={800}
          height={450}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-gray-50 text-3xl">📝</div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {market ? (
          <span className="mb-2 inline-flex w-fit rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
            {market}
          </span>
        ) : null}

        <h2 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-rose-500">
          {post.title}
        </h2>

        {post.metadata?.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.metadata.excerpt}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-xs text-gray-500">
          {post.metadata?.author_name ? <span>{post.metadata.author_name}</span> : null}
          {post.metadata?.author_name && publishedDate ? <span aria-hidden="true">·</span> : null}
          {publishedDate ? <time dateTime={post.metadata?.published_date}>{publishedDate}</time> : null}
          {readTime ? <span aria-hidden="true">·</span> : null}
          {readTime ? <span>{readTime} min read</span> : null}
        </div>
      </div>
    </Link>
  )
}
