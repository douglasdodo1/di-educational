import { Skeleton } from '@/components/ui/skeleton'

export function CourseDetailHeaderSkeleton() {
  return (
    <header className="border-border bg-card relative overflow-hidden rounded-2xl border">
      <div className="relative h-36 w-full sm:h-44">
        <Skeleton className="h-full w-full" />
        <div className="absolute right-5 bottom-4 left-5 text-white">
          <Skeleton className="h-6 w-24 rounded-md bg-white/90" />
          <Skeleton className="mt-2 h-8 w-48 bg-white/90" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4 text-sm">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </header>
  )
}
