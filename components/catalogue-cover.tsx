"use client"

import { useState } from "react"
import type { CatalogueCover } from "@/lib/catalogues-data"

interface CatalogueCoverProps {
  cover: CatalogueCover | null
  title: string
}

export function CatalogueCoverImage({ cover, title }: CatalogueCoverProps) {
  const [hasImageError, setHasImageError] = useState(false)

  if (!cover || hasImageError) {
    return (
      <div className="flex h-full items-end p-6">
        <p className="text-2xl font-bold tracking-tighter text-white">{title}</p>
      </div>
    )
  }

  return (
    // The supplier has approved catalogue integration; this is its documented cover asset.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cover.src}
      alt={cover.alt}
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
      onError={() => setHasImageError(true)}
    />
  )
}
