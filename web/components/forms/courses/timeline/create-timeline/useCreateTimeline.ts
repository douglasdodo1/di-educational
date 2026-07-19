import { useCreateTimelineMutation } from '@/hooks/timelines/useCreateTimelineMutation'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

interface CreateTimelineFormValues {
  date: Date
  is_done: boolean
  contentId: string
}

interface CreateTimelineProps {
  courseId?: string
  handleClose: () => void
  defaultContentId?: string
}

export const useCreateTimeline = ({ courseId, handleClose, defaultContentId }: CreateTimelineProps) => {
  const { createTimeline } = useCreateTimelineMutation(courseId)

  const form = useForm({
    defaultValues: {
      date: new Date(),
      is_done: false,
      contentId: defaultContentId || '',
    } as CreateTimelineFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await createTimeline({
            variables: {
              data: {
                date: value.date,
                is_done: value.is_done,
                contentId: Number(value.contentId),
              },
            },
          })

          if (response?.data) {
            handleClose()
            form.reset()
            toast.success('Cronograma criado com sucesso')
          }
        } catch (e) {
          console.error(e)
          toast.error('Erro ao criar cronograma')
        }
      },
    },
  })

  return form
}
