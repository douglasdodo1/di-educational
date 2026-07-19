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
  setIsLoadingEdit: (isLoading: boolean) => void
  handleClose: () => void
}

export const useUpdateTimeline = ({
  editingItem,
  setIsLoadingEdit,
  handleClose,
}: UpdateTimelineProps) => {
  const { updateTimeline } = useUpdateTimelineMutation()

  const form = useForm({
    defaultValues: {
      date: editingItem?.date ? new Date(editingItem.date) : new Date(),
      contentId: editingItem?.contentId?.toString() || '',
    } as UpdateTimelineFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        setIsLoadingEdit(true)
        try {
          const response = await updateTimeline({
            variables: {
              id: editingItem.id,
              data: {
                date: value.date,
                contentId: Number(value.contentId),
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
        } finally {
          setIsLoadingEdit(false)
        }
      },
    },
  })

  return form
}
