import { useQuery } from '@apollo/client/react'
import { GET_CONTENT_BY_ID } from '@/graphql/contents/getContentByID'
import { Content } from '@/types/content'

export const useContent = (id: string) => {
  const { data, loading, error } = useQuery<{ content: Content }>(GET_CONTENT_BY_ID, {
    variables: { contentId: Number(id) },
  })

  return {
    data,
    loading,
    error,
  }
}
