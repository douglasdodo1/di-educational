import { gql } from '@apollo/client'

export const UPDATE_TIMELINE_MUTATION = gql`
  mutation UpdateTimeline($id: Int!, $data: EditTimelineInput!) {
    updateTimeline(id: $id, data: $data) {
      id
      date
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
