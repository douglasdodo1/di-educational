import * as React from 'react'
import { cn } from '@/lib/utils'

interface PanelProps {
  title: string
  children: React.ReactNode
  className?: string
}

export function Panel({ title, children, className }: PanelProps) {
  return (
    <section className={cn('flex flex-col gap-4', className)}>
      <h2 className="font-heading flex items-center gap-2.5 text-lg font-semibold">
        <span aria-hidden className="bg-primary h-5 w-1.5 rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  )
}
