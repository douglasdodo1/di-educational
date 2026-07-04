import { gql } from '@apollo/client'

export const GET_COURSE_BY_ID = gql`
  query GetCourseByID($id: Int!) {
    course(id: $id) {
      id
      name
      description
      imageUrl
      contents {
        id
        name
        description
        type
        url
      }
    }
  }
`
