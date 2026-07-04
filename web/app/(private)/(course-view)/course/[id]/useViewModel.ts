import { useCourse } from '@/hooks/courses/useCourse'
import { useParams, useRouter } from 'next/navigation'

export const useViewModel = () => {
  const { id } = useParams()
  const { data, loading, error } = useCourse(id as string)
  const course = data?.course
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return {
    course,
    loading,
    error,
    handleBack,
  }
}
