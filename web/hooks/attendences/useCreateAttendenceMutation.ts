import { CREATE_ATTENDENCE_MUTATION } from '@/graphql/attendences/createAttendenceMutation'
import { GET_ATTENDENCES } from '@/graphql/attendences/getAttendences'
import { useMutation } from '@apollo/client/react'
import { AttendenceModel } from '@/types/attendence'

export const useCreateAttendenceMutation = (courseId?: string) => {
  const [createAttendence, { loading, error }] = useMutation<AttendenceModel>(
    CREATE_ATTENDENCE_MUTATION,
    {
      refetchQueries: [{ query: GET_ATTENDENCES, variables: { courseId } }],
      awaitRefetchQueries: true,
    },
  )

  return { createAttendence, loading, error }
}
