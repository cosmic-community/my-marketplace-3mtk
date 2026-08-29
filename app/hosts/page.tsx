import HostCard from '@/components/HostCard'
import { getHosts } from '@/lib/cosmic'

export default async function HostsPage() {
  const hosts = await getHosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Meet our hosts</h1>
      <p className="text-gray-600 mb-8">Get to know the people behind our unique stays.</p>

      {hosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hosts.map((host) => (
            <HostCard key={host.id} host={host} variant="full" linkToProfile />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No hosts available yet.</p>
      )}
    </div>
  )
}