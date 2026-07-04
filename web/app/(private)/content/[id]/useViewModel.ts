import { useContent } from '@/hooks/contents/useContent'
import { useParams, useRouter } from 'next/navigation'

export const useViewModel = () => {
  const params = useParams<{ id?: string }>()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const { data, loading, error } = useContent(id ?? '')
  const content = data?.content
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return {
    content,
    loading,
    error,
    handleBack,
  }
}
