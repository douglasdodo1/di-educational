'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const categories = ['Todas categorias', 'Design', 'Programação', 'Marketing'] as const

export const CourseCategoryFilter = ({
  category,
  setCategory,
}: {
  category: (typeof categories)[number]
  setCategory: (category: (typeof categories)[number]) => void
}) => {
  return (
    <div className="relative sm:w-56">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as (typeof categories)[number])}
        aria-label="Filtrar por categoria"
        className="border-border bg-card focus:border-primary focus:ring-primary/20 h-11 w-full appearance-none rounded-lg border pr-10 pl-4 text-sm transition-colors outline-none focus:ring-2"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
    </div>
  )
}
