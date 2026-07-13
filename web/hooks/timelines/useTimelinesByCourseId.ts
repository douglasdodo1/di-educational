import { GET_TIMELINES_BY_COURSE_ID } from '@/graphql/timelines/getTimelinesByCourseId'
import { Timeline } from '@/types/timeline'
import { useQuery } from '@apollo/client/react'

export const useTimelinesByCourseId = (courseId?: string) => {
  const { data, loading, error } = useQuery<{ timelinesByCourseId: Timeline[] }>(
    GET_TIMELINES_BY_COURSE_ID,
    {
      variables: { courseId: Number(courseId) },
      skip: !courseId,
    },
  )
  return { timelines: data?.timelinesByCourseId, loading, error }
}
