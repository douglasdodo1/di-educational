import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const AttendenceCardSkeleton = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="flex flex-row items-center gap-4 border p-4">
          <Skeleton className="size-10 shrink-0 rounded-xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>
        </Card>
      ))}
    </div>
  )
}
