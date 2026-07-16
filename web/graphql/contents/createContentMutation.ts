import { gql } from '@apollo/client'

export const CREATE_CONTENT_MUTATION = gql`
  mutation CreateContent($data: CreateContentInput!) {
    createContent(data: $data) {
      id
      name
      description
      type
      url
      courseId
    }
  }
`
