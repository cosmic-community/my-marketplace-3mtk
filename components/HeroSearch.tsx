'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSearch() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [guests, setGuests] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (guests) params.set('guests', guests)
    router.push(`/listings?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white rounded-2xl sm:rounded-full shadow-xl p-3 sm:p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2"
    >
      <div className="flex-1 flex items-center gap-3 px-4 py-2">
        <span className="text-xl">📍</span>
        <input
          type="text"
          placeholder="Where are you going?"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full outline-none text-gray-900 placeholder-gray-400 bg-transparent"
        />
      </div>
      <div className="hidden sm:block w-px h-8 bg-gray-200" />
      <div className="flex-1 flex items-center gap-3 px-4 py-2">
        <span className="text-xl">👥</span>
        <input
          type="number"
          min="1"
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="w-full outline-none text-gray-900 placeholder-gray-400 bg-transparent"
        />
      </div>
      <button
        type="submit"
        className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
      >
        Search
      </button>
    </form>
  )
}