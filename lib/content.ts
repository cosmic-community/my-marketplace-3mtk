import { cosmic } from './cosmic'

// Loose metadata typing on purpose: these two object types are authored in
// Cosmic and their optional fields vary per object. Every consumer guards
// before reading, so a missing field degrades gracefully instead of breaking
// the build (see the earlier host/listing schema-mismatch deploy failures).
export interface BlogPost {
  id: string
  slug: string
  title: string
  thumbnail?: string
  metadata: {
    content?: string
    excerpt?: string
    market?: string
    author_name?: string
    published_date?: string
    read_time_minutes?: number
    meta_title?: string
    meta_description?: string
    focus_keyword?: string
    featured_image?: string
    related_posts?: string
    featured_properties?: string
    [key: string]: any
  }
}

export interface Property {
  id: string
  slug: string
  title: string
  thumbnail?: string
  metadata: {
    [key: string]: any
  }
}

function isNotFound(error: any): boolean {
  return error?.status === 404
}

function byPublishedDateDesc(a: BlogPost, b: BlogPost): number {
  const aDate = a.metadata?.published_date ?? ''
  const bDate = b.metadata?.published_date ?? ''
  return bDate.localeCompare(aDate)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'blog-posts' })
      .props('id,slug,title,thumbnail,metadata')
      .depth(1)

    const posts = (response.objects ?? []) as BlogPost[]
    return posts.sort(byPublishedDateDesc)
  } catch (error) {
    if (isNotFound(error)) return []
    throw error
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'blog-posts', slug })
      .props('id,slug,title,thumbnail,metadata')
      .depth(1)

    return (response.object ?? null) as BlogPost | null
  } catch (error) {
    if (isNotFound(error)) return null
    throw error
  }
}

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'properties' })
      .props('id,slug,title,thumbnail,metadata')
      .depth(1)

    return (response.objects ?? []) as Property[]
  } catch (error) {
    if (isNotFound(error)) return []
    throw error
  }
}

export async function getProperty(slug: string): Promise<Property | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'properties', slug })
      .props('id,slug,title,thumbnail,metadata')
      .depth(1)

    return (response.object ?? null) as Property | null
  } catch (error) {
    if (isNotFound(error)) return null
    throw error
  }
}

// related_posts / featured_properties are stored as comma-separated id strings.
export function parseIdList(value?: string): string[] {
  if (!value || typeof value !== 'string') return []
  return value
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
}

export async function getRelatedPosts(post: BlogPost): Promise<BlogPost[]> {
  const ids = parseIdList(post.metadata?.related_posts)
  if (ids.length === 0) return []

  const all = await getBlogPosts()
  return all.filter((candidate) => ids.includes(candidate.id))
}
