import { gql } from '@apollo/client'

export const CREATE_ATTENDENCE_MUTATION = gql`
  mutation CreateAttendence($createAttendenceInput: CreateAttendenceInput!) {
    createAttendence(createAttendenceInput: $createAttendenceInput) {
      id
      date
    }
  }
`
