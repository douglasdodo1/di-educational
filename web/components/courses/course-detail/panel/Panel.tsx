import * as React from 'react'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ADD_LABELS } from '../../utils'

interface PanelProps {
  title: string
  children: React.ReactNode
  className?: string
  onAdd?: () => void
  openModal?: () => void
}

export function Panel({ title, children, className, onAdd, openModal }: PanelProps) {
  const addLabel = ADD_LABELS[title]

  return (
    <section className={cn('flex flex-col gap-4', className)}>
      <div className="flex w-full items-center justify-between">
        <h2 className="font-heading flex items-center gap-2.5 text-lg font-semibold">
          <span aria-hidden className="bg-primary h-5 w-1.5 rounded-full" />
          {title}
        </h2>

        <Button onClick={openModal} size="lg" className="cursor-pointer">
          <Plus className="size-4" />
          {addLabel}
        </Button>
      </div>

      {children}
    </section>
  )
}
