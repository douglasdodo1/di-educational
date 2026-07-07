import { gql } from '@apollo/client'

export const SET_ALL_FREQUENCIES = gql`
  mutation SetAllFrequencies($attendenceId: Int!, $isPresent: Boolean!) {
    setAllFrequencies(attendenceId: $attendenceId, isPresent: $isPresent) {
      id
      is_present
    }
  }
`
