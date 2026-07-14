import { Skeleton } from '@/components/ui/skeleton'

export const TimelineSkeletonList = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-2">
      <ol className="border-border relative flex flex-col gap-6 border-l pl-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index} className="relative">
            <span className="bg-background absolute -left-[31px] flex size-6 items-center justify-center rounded-full">
              <Skeleton className="size-5 rounded-full" />
            </span>
            <div className="flex-row items-start gap-4 rounded-xl border p-6">
              <div className="flex flex-1 items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-4 w-72" />
                </div>
                <div className="flex flex-row items-center gap-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="size-9 rounded-md" />
                  <Skeleton className="size-5 rounded-sm" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
