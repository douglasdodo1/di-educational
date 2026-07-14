import { GET_TIMELINES_BY_COURSE_ID } from '@/graphql/timelines/getTimelinesByCourseId'
import { TimelineModel } from '@/types/timelineModel'
import { useQuery } from '@apollo/client/react'

export const useTimelinesByCourseId = (courseId?: string) => {
  const { data, loading, error } = useQuery<{ timelinesByCourseId: TimelineModel[] }>(
    GET_TIMELINES_BY_COURSE_ID,
    {
      variables: { courseId: Number(courseId) },
      skip: !courseId,
    },
  )
  return { timelines: data?.timelinesByCourseId, loading, error }
}
