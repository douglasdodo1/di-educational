import { gql } from '@apollo/client'

export const UPDATE_CONTENT_MUTATION = gql`
  mutation UpdateContent($data: UpdateContentInput!) {
    updateContent(data: $data) {
      id
      name
      description
      type
      url
      courseId
    }
  }
`
