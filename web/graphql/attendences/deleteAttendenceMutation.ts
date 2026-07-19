import { gql } from '@apollo/client'

export const DELETE_ATTENDENCE_MUTATION = gql`
  mutation DeleteAttendence($id: Int!) {
    deleteAttendence(id: $id)
  }
`
