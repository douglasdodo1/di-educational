import { GET_FREQUENCIES } from '@/graphql/frequencies/getFrequencies'
import { Frequency } from '@/types/frequency'
import { useQuery } from '@apollo/client/react'

export const useFrequencies = ({ attendenceId }: { attendenceId: number }) => {
  const { data, loading, error } = useQuery<{ frequencies: Frequency[] }>(GET_FREQUENCIES, {
    variables: { attendenceId },
  })
  const frequencies = data?.frequencies
  return { frequencies, loading, error }
}
