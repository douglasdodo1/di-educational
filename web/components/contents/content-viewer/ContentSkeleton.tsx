import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ContentSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <Card className="p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-7 w-36 rounded-md" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="mt-6 space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        <div className="mx-auto mt-8 w-full max-w-3xl space-y-4">
          <Skeleton className="h-64 w-full rounded-xl" />
          <div className="flex gap-3">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </Card>
    </section>
  )
}
