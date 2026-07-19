import { DELETE_ATTENDENCE_MUTATION } from '@/graphql/attendences/deleteAttendenceMutation'
import { GET_ATTENDENCES } from '@/graphql/attendences/getAttendences'
import { useMutation } from '@apollo/client/react'

export const useDeleteAttendenceMutation = (courseId?: string) => {
  const [deleteAttendence, { loading, error }] = useMutation<boolean>(
    DELETE_ATTENDENCE_MUTATION,
    {
      refetchQueries: [{ query: GET_ATTENDENCES, variables: { courseId } }],
      awaitRefetchQueries: true,
    },
  )

  return [deleteAttendence, { loading, error }] as const
}
