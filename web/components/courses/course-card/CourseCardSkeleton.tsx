import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function CourseCardSkeleton() {
  return (
    <Card className="pt-0">
      <div className="relative aspect-[16/10] overflow-hidden px-0">
        <Skeleton className="h-full w-full rounded-t-xl rounded-b-none" />
        <Skeleton className="absolute top-3 left-3 h-6 w-20 rounded-md" />
      </div>
      <CardContent>
        <div className="flex items-center gap-4 py-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="mt-2 h-6 w-3/4" />
        <Skeleton className="mt-3 h-4 w-full" />
        <Skeleton className="mt-1.5 h-4 w-2/3" />

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}
