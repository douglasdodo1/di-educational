import { CREATE_CONTENT_MUTATION } from '@/graphql/contents/createContentMutation'
import { GET_COURSE_BY_ID } from '@/graphql/courses/getCourseByID'
import { useMutation } from '@apollo/client/react'
import { ContentModel } from '@/types/content'

export const useCreateContentMutation = (courseId?: string) => {
  const [createContent, { loading, error }] = useMutation<ContentModel>(CREATE_CONTENT_MUTATION, {
    refetchQueries: courseId
      ? [
          {
            query: GET_COURSE_BY_ID,
            variables: { id: Number(courseId) },
          },
        ]
      : [],
    awaitRefetchQueries: true,
  })

  return { createContent, loading, error }
}
