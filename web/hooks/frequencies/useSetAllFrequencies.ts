import { useMutation } from '@apollo/client/react'
import { SET_ALL_FREQUENCIES } from '@/graphql/frequencies/setAllFrequency'

export const useSetAllFrequencies = () => {
  return useMutation(SET_ALL_FREQUENCIES)
}
