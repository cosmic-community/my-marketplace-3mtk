import StarRating from '@/components/StarRating'
import type { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ReviewCard({ review }: { review: Review }) {
  const avatar = review.metadata?.guest_avatar
  const guestName = getMetafieldValue(review.metadata?.guest_name)
  const reviewText = getMetafieldValue(review.metadata?.review_text)
  const rating = review.metadata?.rating || 0
  const stayDate = review.metadata?.stay_date

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
            alt={guestName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">🙂</div>
        )}
        <div>
          <p className="font-medium text-gray-900">{guestName}</p>
          {stayDate && (
            <p className="text-xs text-gray-400">
              {new Date(stayDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
      </div>
      <StarRating rating={rating} size="sm" />
      <p className="text-gray-600 text-sm mt-2 leading-relaxed">{reviewText}</p>
    </div>
  )
}