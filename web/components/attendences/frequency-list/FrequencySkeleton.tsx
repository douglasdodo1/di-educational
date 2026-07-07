import { Skeleton } from '@/components/ui/skeleton'

export const FrequencySkeleton = () => {
  return (
    <ul className="divide-border border-border flex flex-col divide-y overflow-hidden rounded-xl border">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Skeleton className="hidden h-6 w-16 rounded-full sm:inline-block" />
            <Skeleton className="h-6 w-11 rounded-full" />
          </div>
        </li>
      ))}
    </ul>
  )
}
