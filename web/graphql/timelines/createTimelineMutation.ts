import { gql } from '@apollo/client'

export const CREATE_TIMELINE_MUTATION = gql`
  mutation CreateTimeline($date: Date!, $is_done: Boolean!, $courseId: Int!, $contentId: Int!) {
    createTimeline(date: $date, is_done: $is_done, courseId: $courseId, contentId: $contentId) {
      id
      date
      is_done
      courseId
      contentId
    }
  }
`
