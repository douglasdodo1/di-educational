import { gql } from '@apollo/client'

export const CREATE_TIMELINE_MUTATION = gql`
  mutation CreateTimeline($data: CreateTimelineInput!) {
    createTimeline(data: $data) {
      id
      date
      is_done
      contentId

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
