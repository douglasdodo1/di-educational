import { UPDATE_ATTENDENCE_MUTATION } from '@/graphql/attendences/updateAttendenceMutation'
import { useMutation } from '@apollo/client/react'
import { AttendenceModel } from '@/types/attendence'

export const useUpdateAttendenceMutation = () => {
  const [updateAttendence, { loading, error }] = useMutation<AttendenceModel>(
    UPDATE_ATTENDENCE_MUTATION,
  )

  return { updateAttendence, loading, error }
}
