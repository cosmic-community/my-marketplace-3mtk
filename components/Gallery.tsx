'use client'

import { useState } from 'react'
import type { CosmicFile } from '@/types'

interface GalleryProps {
  images: CosmicFile[]
  title: string
}

export default function Gallery({ images, title }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!images || images.length === 0) return null

  const activeImage = images[activeIndex]

  if (!activeImage) return null

  return (
    <div>
      <div className="rounded-2xl overflow-hidden bg-gray-100 h-72 sm:h-96 mb-3">
        <img
          src={`${activeImage.imgix_url}?w=1600&h=1000&fit=crop&auto=format,compress`}
          alt={`${title} photo ${activeIndex + 1}`}
          width={1000}
          height={640}
          className="w-full h-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                index === activeIndex ? 'border-rose-500' : 'border-transparent'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={`${title} thumbnail ${index + 1}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}