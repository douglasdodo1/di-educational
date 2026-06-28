'use client'

import { Bell } from 'lucide-react'
import { SidebarTrigger } from '../ui/sidebar'
import { Label } from '../ui/label'
import { ModeToggle } from '../mode-toggle/ModeToggle'

export default function Topbar() {
  return (
    <header className="border-border bg-card text-foreground sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b px-4 md:px-6">
      <div className="flex items-center gap-3">
        <div>
          <Label>Di-educational</Label>
        </div>
        <SidebarTrigger className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg transition-colors" />
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          aria-label="Notificações"
          className="text-muted-foreground hover:bg-secondary hover:text-foreground relative flex size-9 items-center justify-center rounded-lg transition-colors"
        >
          <Bell className="size-5" />
          <span
            className="bg-destructive ring-card absolute top-2 right-2 size-2 rounded-full ring-2"
            aria-hidden
          />
        </button>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <div className="hidden text-right sm:block">
            <p className="text-sm leading-tight font-semibold">Pedro Lima</p>
          </div>

          <div className="bg-primary text-primary-foreground flex size-10 items-center justify-center rounded-full font-medium">
            PL
          </div>
        </div>
      </div>
    </header>
  )
}
