import { GET_ATTENDENCES } from '@/graphql/attendences/getAttendences'
import { useQuery } from '@apollo/client/react'

export const useAttendences = (courseId?: string) => {
  const { data, loading, error } = useQuery<{ attendences: { id: number; date: string }[] }>(
    GET_ATTENDENCES,
    {
      variables: { courseId: Number(courseId) },
      skip: !courseId,
    },
  )
  return { attendences: data?.attendences, loading, error }
}
