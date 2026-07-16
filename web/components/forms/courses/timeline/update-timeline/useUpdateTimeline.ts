import { useUpdateTimelineMutation } from '@/hooks/timelines/useUpdateTimelineMutation'
import { TimelineModel } from '@/types/timelineModel'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

interface UpdateTimelineFormValues {
  date: Date
  contentId: string
}

interface UpdateTimelineProps {
  editingItem: TimelineModel
  handleClose: () => void
}

export const useUpdateTimeline = ({ editingItem, handleClose }: UpdateTimelineProps) => {
  const { updateTimeline } = useUpdateTimelineMutation()

  const form = useForm({
    defaultValues: {
      date: editingItem?.date ? new Date(editingItem.date) : new Date(),
      contentId: editingItem?.content?.id?.toString() || '',
    } as UpdateTimelineFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          const response = await updateTimeline({
            variables: {
              id: editingItem.id,
              data: {
                date: value.date,
                contentId: value.contentId ? Number(value.contentId) : null,
              },
            },
          })

          if (response?.data) {
            handleClose()
            form.reset()
            toast.success('Cronograma atualizado com sucesso')
          }
        } catch (e) {
          console.error(e)
          toast.error('Erro ao atualizar cronograma')
        }
      },
    },
  })

  return form
}
