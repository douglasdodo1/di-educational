import { gql } from '@apollo/client'

export const GET_FREQUENCIES = gql`
  query GetFrequencies($attendenceId: Int!) {
    frequencies(attendenceId: $attendenceId) {
      id
      is_present
      attendence {
        date
      }
      student {
        id
        user {
          id
          first_name
          last_name
        }
      }
    }
  }
`
