import { useCreateTimelineMutation } from '@/hooks/timelines/useCreateTimelineMutation'
import { useForm } from '@tanstack/react-form'

interface TimelineFormValues {
  date: Date
  is_done: boolean
  contentId: string
}

export const useTimeline = (courseId?: string) => {
  const { createTimeline } = useCreateTimelineMutation()

  const form = useForm({
    defaultValues: {
      date: new Date(),
      is_done: false,
      contentId: '',
    } as TimelineFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          await createTimeline({
            variables: {
              date: value.date,
              is_done: value.is_done,
              courseId: courseId,
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
