import { CREATE_TIMELINE_MUTATION } from '@/graphql/timelines/createTimelineMutation'
import { Timeline } from '@/types/timeline'
import { useMutation } from '@apollo/client/react'

export const useCreateTimelineMutation = () => {
  const [createTimeline, { loading, error }] = useMutation<{ createTimeline: Timeline }>(
    CREATE_TIMELINE_MUTATION,
  )
  return { createTimeline, loading, error }
}
