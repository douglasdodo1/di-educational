import { CourseGrid } from '@/components/courses/course-grid/CourseGrid'
import { StatsRow } from '@/components/stats-row/StatsRow'

export default function home() {
  return (
    <div className="flex flex-col gap-10">
      <StatsRow />
      <CourseGrid />
    </div>
  )
}
