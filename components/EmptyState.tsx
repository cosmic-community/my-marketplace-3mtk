export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
      <span className="text-4xl mb-3">🔍</span>
      <p className="text-gray-500">{message}</p>
    </div>
  )
}