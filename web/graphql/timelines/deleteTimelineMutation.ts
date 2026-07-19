import { gql } from '@apollo/client'

export const DELETE_TIMELINE_MUTATION = gql`
  mutation DeleteTimeline($id: Int!) {
    deleteTimeline(id: $id)
  }
`
