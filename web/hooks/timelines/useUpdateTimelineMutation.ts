import { UPDATE_TIMELINE_MUTATION } from '@/graphql/timelines/updateTimelineMutation'
import { useMutation } from '@apollo/client/react'

export const useUpdateTimelineMutation = () => {
  const [updateTimeline, { loading, error }] = useMutation(UPDATE_TIMELINE_MUTATION)

  return { updateTimeline, loading, error }
}
