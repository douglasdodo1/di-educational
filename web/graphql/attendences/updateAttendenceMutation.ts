import { gql } from '@apollo/client'

export const UPDATE_ATTENDENCE_MUTATION = gql`
  mutation UpdateAttendence($updateAttendenceInput: UpdateAttendenceInput!) {
    updateAttendence(updateAttendenceInput: $updateAttendenceInput) {
      id
      date
    }
  }
`
