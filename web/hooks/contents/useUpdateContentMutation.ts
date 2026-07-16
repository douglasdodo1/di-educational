import { UPDATE_CONTENT_MUTATION } from '@/graphql/contents/updateContentMutation'
import { ContentModel } from '@/types/content'
import { useMutation } from '@apollo/client/react'

export const useUpdateContentMutation = () => {
  const [updateContent, { loading, error }] = useMutation<ContentModel>(UPDATE_CONTENT_MUTATION)

  return { updateContent, loading, error }
}
