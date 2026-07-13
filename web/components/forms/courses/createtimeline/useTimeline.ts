import { useCreateTimelineMutation } from '@/hooks/timelines/useCreateTimelineMutation'
import { useForm } from '@tanstack/react-form'

interface TimelineFormValues {
  date: Date
  is_done: boolean
  contentId: string
}

interface TimeLineProps {
  courseId?: string
  handleClose: () => void
}

export const useTimeline = ({ courseId, handleClose }: TimeLineProps) => {
  const { createTimeline } = useCreateTimelineMutation(courseId)

  const form = useForm({
    defaultValues: {
      date: new Date(),
      is_done: false,
      contentId: '',
    } as TimelineFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await createTimeline({
            variables: {
              data: {
                date: value.date,
                is_done: value.is_done,
                courseId: Number(courseId),
                contentId: value.contentId ? Number(value.contentId) : null,
              },
            },
          })

          if (response.data) {
            handleClose()
            form.reset()
          }
        } catch (e) {
          return 'Erro ao criar cronograma'
        }
      },
    },
  })

  return form
}
