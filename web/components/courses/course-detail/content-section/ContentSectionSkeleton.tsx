import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ContentSectionSkeletonProps {
  count?: number
}

export function ContentSectionSkeleton({ count = 3 }: ContentSectionSkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="flex flex-row items-center justify-between gap-4 p-6">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <Skeleton className="h-10 w-10 rounded-full" />
        </Card>
      ))}
    </div>
  )
}
