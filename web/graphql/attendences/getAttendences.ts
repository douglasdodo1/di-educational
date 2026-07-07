import { gql } from '@apollo/client'

export const GET_ATTENDENCES = gql`
  query getAttendences($courseId: Int!) {
    attendences(courseId: $courseId) {
      id
      date
      frequencies {
        id
      }
    }
  }
`
