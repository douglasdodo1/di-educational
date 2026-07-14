import { gql } from '@apollo/client'

export const UPDATE_IS_DONE_TIMELINE_MUTATION = gql`
  mutation updateIsdone($id: Int!, $data: EditTimelineIsDoneInput!) {
    updateTimelineIsDone(id: $id, data: $data) {
      id
      date
      is_done
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
