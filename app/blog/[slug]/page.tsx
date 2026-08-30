import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from '@/components/Markdown'
import BlogCard from '@/components/BlogCard'
import { getBlogPost, getBlogPosts, getRelatedPosts } from '@/lib/content'

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug)
  if (!post) return { title: 'Post not found - My Marketplace' }

  const title = post.metadata?.meta_title || `${post.title} - My Marketplace`
  const description = post.metadata?.meta_description || post.metadata?.excerpt || undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  }
}

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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedPosts(post)
  const publishedDate = formatDate(post.metadata?.published_date)
  const readTime = post.metadata?.read_time_minutes

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/blog" className="text-sm font-medium text-rose-500 hover:text-rose-600">
        ← Back to blog
      </Link>

      <header className="mt-6">
        {post.metadata?.market ? (
          <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
            {post.metadata.market}
          </span>
        ) : null}

        <h1 className="mt-3 text-4xl font-bold leading-tight text-gray-900">{post.title}</h1>

        {post.metadata?.excerpt ? (
          <p className="mt-4 text-lg text-gray-600">{post.metadata.excerpt}</p>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">
          {post.metadata?.author_name ? <span>{post.metadata.author_name}</span> : null}
          {post.metadata?.author_name && publishedDate ? <span aria-hidden="true">·</span> : null}
          {publishedDate ? <time dateTime={post.metadata?.published_date}>{publishedDate}</time> : null}
          {readTime ? <span aria-hidden="true">·</span> : null}
          {readTime ? <span>{readTime} min read</span> : null}
        </div>
      </header>

      {post.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${post.thumbnail}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={post.title}
          width={1600}
          height={900}
          className="mt-8 w-full rounded-2xl object-cover"
        />
      ) : null}

      {post.metadata?.content ? (
        <div className="mt-8">
          <Markdown content={post.metadata.content} />
        </div>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="mt-16 border-t border-gray-100 pt-10">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related reading</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <BlogCard key={related.id} post={related} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
