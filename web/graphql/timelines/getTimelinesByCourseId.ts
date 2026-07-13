import { gql } from '@apollo/client'

export const GET_TIMELINES_BY_COURSE_ID = gql`
  query getTimelinesByCourseId($courseId: Int!) {
    timelinesByCourseId(courseId: $courseId) {
      id
      is_done
      date
      content {
        id
        name
        description
        type
        url
      }
    }
  }
`
