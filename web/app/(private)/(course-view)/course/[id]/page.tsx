'use client'
import { CourseDetail } from '@/components/courses/course-detail/CourseDetail'
import { useCourse } from '@/hooks/courses/useCourse'
import { useRouter } from 'next/navigation'
import { use } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function Course({ params }: PageProps) {
  const { id } = use(params)
  const { data, loading, error } = useCourse(id)
  const router = useRouter()

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <CourseDetail course={data!.course} onBack={() => router.back()} />
      )}
    </div>
  )
}
