import { UPDATE_IS_DONE_TIMELINE_MUTATION } from '@/graphql/timelines/updateIsdoneTimelineMutation'
import { useMutation } from '@apollo/client/react'

export const useUpdateIsdoneTimelineMutation = () => {
  const [updateIsdoneTimeline, { loading, error }] = useMutation(UPDATE_IS_DONE_TIMELINE_MUTATION)

  return { updateIsdoneTimeline, loading, error }
}
