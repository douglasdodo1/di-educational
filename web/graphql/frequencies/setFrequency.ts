import { gql } from '@apollo/client'

export const SET_FREQUENCY = gql`
  mutation SetFrequency($frequencyId: Int!, $isPresent: Boolean!) {
    setFrequency(frequencyId: $frequencyId, isPresent: $isPresent) {
      id
      is_present
    }
  }
`
