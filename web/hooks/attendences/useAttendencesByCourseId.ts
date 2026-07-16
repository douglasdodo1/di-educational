import { GET_ATTENDENCES } from '@/graphql/attendences/getAttendences'
import { AttendenceModel } from '@/types/attendence'
import { useQuery } from '@apollo/client/react'

export const useAttendences = (courseId?: string) => {
  const { data, loading, error } = useQuery<{ attendences: AttendenceModel[] }>(GET_ATTENDENCES, {
    variables: { courseId: Number(courseId) },
    skip: !courseId,
  })
  return { attendences: data?.attendences, loading, error }
}
