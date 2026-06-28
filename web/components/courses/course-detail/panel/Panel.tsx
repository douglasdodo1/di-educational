import * as React from 'react'

interface PanelProps {
  title: string
  children: React.ReactNode
}

export function Panel({ title, children }: PanelProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading flex items-center gap-2.5 text-lg font-semibold">
        <span aria-hidden className="bg-primary h-5 w-1.5 rounded-full" />
        {title}
      </h2>
      {children}
    </section>
  )
}
