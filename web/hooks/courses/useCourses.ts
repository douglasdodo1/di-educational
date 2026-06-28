import { useQuery } from '@apollo/client/react'
import { GET_COURSES } from '@/graphql/getCourse'
import { Course } from '@/types/course'

export const useCourses = () => {
  const { data, loading, error } = useQuery<{ Courses: Course[] }>(GET_COURSES)
  return { data, loading, error }
}
