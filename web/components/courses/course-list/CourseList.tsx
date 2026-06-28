import { CourseCard } from '../course-card/CourseCard'
import { Course } from '@/types/course'

export const CourseList = ({
  filtered,
  onSelectCourse,
}: {
  filtered: Course[]
  onSelectCourse?: (course: Course) => void
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 px-px py-px md:grid-cols-2 xl:grid-cols-4">
      {filtered.map((course) => (
        <CourseCard key={course.id} course={course} onSelect={onSelectCourse} />
      ))}
    </div>
  )
}
