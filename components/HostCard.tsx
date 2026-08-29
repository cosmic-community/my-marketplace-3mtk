import Link from 'next/link'
import type { Host } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface HostCardProps {
  host: Host
  variant?: 'compact' | 'full'
  linkToProfile?: boolean
}

export default function HostCard({ host, variant = 'compact', linkToProfile = true }: HostCardProps) {
  const avatar = host.metadata?.avatar
  const name = getMetafieldValue(host.metadata?.name) || host.title
  const location = getMetafieldValue(host.metadata?.location)
  const bio = getMetafieldValue(host.metadata?.bio)

  const content = (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 mb-4">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">👤</div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-gray-900">{name}</p>
            {host.metadata?.superhost && <span title="Superhost">⭐</span>}
          </div>
          {location && <p className="text-sm text-gray-500">📍 {location}</p>}
        </div>
      </div>

      {variant === 'full' && bio && <p className="text-sm text-gray-600 mb-4 line-clamp-3">{bio}</p>}

      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
        {typeof host.metadata?.response_rate === 'number' && <span>{host.metadata.response_rate}% response rate</span>}
        {host.metadata?.joined_date && <span>Joined {new Date(host.metadata.joined_date).getFullYear()}</span>}
      </div>
    </div>
  )

  if (linkToProfile) {
    return <Link href={`/hosts/${host.slug}`}>{content}</Link>
  }

  return content
}