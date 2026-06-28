'use client'
import { CourseCardSkeleton } from '@/components/courses/course-card/CourseCardSkeleton'
import { CourseSearchBar } from '../course-search-bar/CourseSearchBar'
import { CourseCategoryFilter } from '../course-category-filter/CourseCategoryFilter'
import { Course } from '@/types/course'
import { useViewModel } from './useViewModel'
import { CourseList } from '../course-list/CourseList'
import { CourseListError } from '../course-list-error/CourseListError'
import { CoursesNotFound } from '../courses-not-found/CoursesNotFound'

export const CourseGrid = ({ onSelectCourse }: { onSelectCourse?: (course: Course) => void }) => {
  const { query, setQuery, category, setCategory, filtered, loading, error } = useViewModel()

  return (
    <section aria-label="Seus cursos" className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <CourseSearchBar query={query} setQuery={setQuery} />
        <CourseCategoryFilter category={category} setCategory={setCategory} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-5 px-px py-px md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <CourseListError />
      ) : filtered.length > 0 ? (
        <CourseList filtered={filtered} onSelectCourse={onSelectCourse} />
      ) : (
        <CoursesNotFound />
      )}
    </section>
  )
}
