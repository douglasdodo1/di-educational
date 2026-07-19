import { DELETE_TIMELINE_MUTATION } from '@/graphql/timelines/deleteTimelineMutation'
import { GET_TIMELINES_BY_COURSE_ID } from '@/graphql/timelines/getTimelinesByCourseId'
import { useMutation } from '@apollo/client/react'

export const useDeleteTimelineMutation = (courseId?: string) => {
  const [deleteTimeline, { loading, error }] = useMutation<boolean>(
    DELETE_TIMELINE_MUTATION,
    {
      refetchQueries: [
        { query: GET_TIMELINES_BY_COURSE_ID, variables: { courseId } },
      ],
      awaitRefetchQueries: true,
    },
  )

  return [deleteTimeline, { loading, error }] as const
}
