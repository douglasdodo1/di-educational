import { useCreateTimelineMutation } from '@/hooks/timelines/useCreateTimelineMutation'
import { useForm } from '@tanstack/react-form'

interface TimelineFormValues {
  date: Date
  is_done: boolean
  courseId: string | null
  contentId: string | null
}

export const useTimeline = () => {
  const { createTimeline } = useCreateTimelineMutation()

  const form = useForm({
    defaultValues: {
      date: new Date(),
      is_done: false,
      courseId: null,
      contentId: null,
    } as TimelineFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          await createTimeline({
            variables: {
              date: value.date,
              is_done: value.is_done,
              courseId: value.courseId,
              contentId: value.contentId,
            },
          })
        } catch (e) {
          return 'Erro ao criar cronograma'
        }
      },
    },
  })

  return form
}
