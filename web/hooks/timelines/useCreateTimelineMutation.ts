import { CREATE_TIMELINE_MUTATION } from '@/graphql/timelines/createTimelineMutation'
import { GET_TIMELINES_BY_COURSE_ID } from '@/graphql/timelines/getTimelinesByCourseId'
import { TimelineModel } from '@/types/timelineModel'
import { useMutation } from '@apollo/client/react'

export const useCreateTimelineMutation = (courseId?: string) => {
  const [createTimeline, { loading, error }] = useMutation<{
    createTimeline: TimelineModel
  }>(CREATE_TIMELINE_MUTATION, {
    refetchQueries: courseId
      ? [
          {
            query: GET_TIMELINES_BY_COURSE_ID,
            variables: {
              courseId: Number(courseId),
            },
          },
        ]
      : [],
    awaitRefetchQueries: true,
  })

  return { createTimeline, loading, error }
}
