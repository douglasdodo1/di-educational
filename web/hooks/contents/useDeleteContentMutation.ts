import { DELETE_CONTENT_MUTATION } from '@/graphql/contents/deleteContentMutation'
import { GET_COURSE_BY_ID } from '@/graphql/courses/getCourseByID'
import { useMutation } from '@apollo/client/react'

export const useDeleteContentMutation = (courseId?: string) => {
  const [deleteContent, { loading, error }] = useMutation<boolean>(DELETE_CONTENT_MUTATION, {
    refetchQueries: courseId
      ? [{ query: GET_COURSE_BY_ID, variables: { id: Number(courseId) } }]
      : [],
    awaitRefetchQueries: true,
  })

  return [deleteContent, { loading, error }] as const
}
