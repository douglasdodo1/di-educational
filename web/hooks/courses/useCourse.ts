import { useQuery } from '@apollo/client/react'
import { GET_COURSE_BY_ID } from '@/graphql/courses/getCourseByID'
import { Course } from '@/types/course'

export const useCourse = (id: string) => {
  const { data, loading, error } = useQuery<{ course: Course }>(GET_COURSE_BY_ID, {
    variables: { id: parseInt(id, 10) },
  })

  return {
    data,
    loading,
    error,
  }
}
