import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Markdown from '@/components/Markdown'
import { getProperties, getProperty } from '@/lib/content'

export async function generateStaticParams() {
  const properties = await getProperties()
  return properties.map((property) => ({ slug: property.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const property = await getProperty(params.slug)
  if (!property) return { title: 'Property not found - My Marketplace' }

  const description =
    typeof property.metadata?.description === 'string'
      ? property.metadata.description.slice(0, 160)
      : undefined

  return {
    title: `${property.title} - My Marketplace`,
    description,
    openGraph: {
      title: property.title,
      description,
      images: property.thumbnail ? [property.thumbnail] : undefined,
    },
  }
}

function formatPrice(value: unknown): string | null {
  const amount = typeof value === 'string' ? Number(value) : value
  if (typeof amount !== 'number' || Number.isNaN(amount)) return null
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })
}

function toDisplayString(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) return value
  if (typeof value === 'number') return value.toLocaleString('en-US')
  return null
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const property = await getProperty(params.slug)
  if (!property) notFound()

  const meta = property.metadata ?? {}
  const price = formatPrice(meta.price ?? meta.list_price ?? meta.asking_price)
  const location = toDisplayString(meta.neighborhood ?? meta.city ?? meta.address)

  const specs: Array<{ label: string; value: string }> = []
  const bedrooms = toDisplayString(meta.bedrooms)
  const bathrooms = toDisplayString(meta.bathrooms)
  const squareFeet = toDisplayString(meta.square_feet ?? meta.square_footage)
  const propertyType = toDisplayString(meta.property_type)
  const yearBuilt = toDisplayString(meta.year_built)

  if (bedrooms) specs.push({ label: 'Bedrooms', value: bedrooms })
  if (bathrooms) specs.push({ label: 'Bathrooms', value: bathrooms })
  if (squareFeet) specs.push({ label: 'Square feet', value: squareFeet })
  if (propertyType) specs.push({ label: 'Property type', value: propertyType })
  if (yearBuilt) specs.push({ label: 'Year built', value: yearBuilt })

  const description = typeof meta.description === 'string' ? meta.description : null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/properties" className="text-sm font-medium text-rose-500 hover:text-rose-600">
        ← Back to properties
      </Link>

      {property.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${property.thumbnail}?w=1600&h=900&fit=crop&auto=format,compress`}
          alt={property.title}
          width={1600}
          height={900}
          className="mt-6 w-full rounded-2xl object-cover"
        />
      ) : null}

      <header className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
        {location ? <p className="mt-2 text-gray-600">{location}</p> : null}
        {price ? <p className="mt-4 text-2xl font-bold text-gray-900">{price}</p> : null}
      </header>

      {specs.length > 0 ? (
        <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {specs.map((spec) => (
            <div key={spec.label} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-gray-500">{spec.label}</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {description ? (
        <section className="mt-10">
          <h2 className="mb-4 text-xl font-bold text-gray-900">About this property</h2>
          <Markdown content={description} />
        </section>
      ) : null}
    </div>
  )
}
