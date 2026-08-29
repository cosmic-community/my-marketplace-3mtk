// app/hosts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import ListingGrid from '@/components/ListingGrid'
import { getHostBySlug, getListingsByHostId, getMetafieldValue } from '@/lib/cosmic'

interface HostPageProps {
  params: Promise<{ slug: string }>
}

export default async function HostProfilePage({ params }: HostPageProps) {
  const { slug } = await params
  const host = await getHostBySlug(slug)

  if (!host) {
    notFound()
  }

  const listings = await getListingsByHostId(host.id)
  const avatar = host.metadata?.avatar
  const hostName = getMetafieldValue(host.metadata?.name) || host.title
  const location = getMetafieldValue(host.metadata?.location)
  const bio = getMetafieldValue(host.metadata?.bio)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=240&h=240&fit=crop&auto=format,compress`}
            alt={hostName}
            width={120}
            height={120}
            className="w-28 h-28 rounded-full object-cover"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center text-4xl">👤</div>
        )}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{hostName}</h1>
            {host.metadata?.superhost && (
              <span className="text-xs font-semibold bg-rose-100 text-rose-600 px-2.5 py-1 rounded-full">
                ⭐ Superhost
              </span>
            )}
          </div>
          {location && <p className="text-gray-600 mb-2">📍 {location}</p>}
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {typeof host.metadata?.response_rate === 'number' && (
              <span>{host.metadata.response_rate}% response rate</span>
            )}
            {host.metadata?.joined_date && (
              <span>Joined {new Date(host.metadata.joined_date).getFullYear()}</span>
            )}
          </div>
        </div>
      </div>

      {bio && (
        <p className="text-gray-600 leading-relaxed max-w-3xl mb-12 whitespace-pre-line">{bio}</p>
      )}

      <h2 className="text-xl font-semibold text-gray-900 mb-6">Listings by {hostName}</h2>
      <ListingGrid listings={listings} emptyMessage="This host doesn't have any active listings yet." />
    </div>
  )
}