'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-rose-500 font-bold text-xl">
            <span>🏡</span>
            <span>My Marketplace</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">
              Home
            </Link>
            <Link href="/listings" className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">
              Listings
            </Link>
            <Link href="/properties" className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">
              Properties
            </Link>
            <Link href="/hosts" className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">
              Hosts
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">
              Blog
            </Link>
          </nav>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-700 hover:text-rose-500">
              Home
            </Link>
            <Link
              href="/listings"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-rose-500"
            >
              Listings
            </Link>
            <Link
              href="/properties"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-gray-700 hover:text-rose-500"
            >
              Properties
            </Link>
            <Link href="/hosts" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-700 hover:text-rose-500">
              Hosts
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-700 hover:text-rose-500">
              Blog
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
