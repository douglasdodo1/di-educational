import { gql } from '@apollo/client'

export const GET_COURSES = gql`
  query GetCourses {
    Courses {
      id
      name
      description
      imageUrl
      classes {
        id
        name
        description
        content {
          type
          url
        }
      }
    }
  }
`
