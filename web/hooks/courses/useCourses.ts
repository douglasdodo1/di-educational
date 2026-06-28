import { useQuery } from '@apollo/client/react'
import { Course } from '@/types/course'
import { GET_COURSES } from '@/graphql/courses/getCourses'

export const useCourses = () => {
  const { data, loading, error } = useQuery<{ Courses: Course[] }>(GET_COURSES)
  return { data, loading, error }
}
