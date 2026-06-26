"use client";

import { Bell } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { Label } from "../ui/label";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-card px-4 text-foreground md:px-6">
      <div className="flex items-center gap-3">
        <div>
          <Label>Di-educational</Label>
        </div>
        <SidebarTrigger className="rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" />
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          aria-label="Notificações"
          className="relative flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-card" aria-hidden />
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight">Pedro Lima</p>
          </div>

          <div className="flex size-10 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground">
            PL
          </div>
        </div>
      </div>
    </header>
  );
}
