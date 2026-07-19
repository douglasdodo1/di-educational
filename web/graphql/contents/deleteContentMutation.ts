import { gql } from '@apollo/client'

export const DELETE_CONTENT_MUTATION = gql`
  mutation DeleteContent($id: Int!) {
    deleteContent(id: $id)
  }
`
