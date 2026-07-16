import { useQuery } from '@apollo/client/react'
import { GET_CONTENT_BY_ID } from '@/graphql/contents/getContentByID'
import { ContentModel } from '@/types/content'

export const useContent = (id: string) => {
  const { data, loading, error } = useQuery<{ content: ContentModel }>(GET_CONTENT_BY_ID, {
    variables: { contentId: Number(id) },
  })

  return {
    data,
    loading,
    error,
  }
}
