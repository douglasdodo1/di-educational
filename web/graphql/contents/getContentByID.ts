import { gql } from '@apollo/client'

export const GET_CONTENT_BY_ID = gql`
  query GetContentByID($contentId: Int!) {
    content(contentId: $contentId) {
      id
      name
      description
      type
      url
    }
  }
`
