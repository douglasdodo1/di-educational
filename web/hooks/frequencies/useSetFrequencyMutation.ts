import { SET_FREQUENCY } from '@/graphql/frequencies/setFrequency'
import { useMutation } from '@apollo/client/react'

export const useSetFrequencyMutation = () => {
  return useMutation(SET_FREQUENCY)
}
