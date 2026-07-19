import { AttendenceModel } from '@/types/attendence'
import { useForm } from '@tanstack/react-form'
import { useUpdateAttendenceMutation } from '@/hooks/attendences/useUpdateAttendenceMutation'
import { toast } from 'sonner'

interface UpdateAttendenceFormValues {
  date: Date
}

interface UpdateAttendenceProps {
  editingItem: AttendenceModel
  setIsLoadingEdit: (isLoading: boolean) => void
  handleClose: () => void
}

export const useUpdateAttendence = ({
  editingItem,
  setIsLoadingEdit,
  handleClose,
}: UpdateAttendenceProps) => {
  const { updateAttendence } = useUpdateAttendenceMutation()

  const form = useForm({
    defaultValues: {
      date: editingItem?.date ? new Date(editingItem.date) : new Date(),
    } as UpdateAttendenceFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        setIsLoadingEdit(true)
        try {
          const response = await updateAttendence({
            variables: {
              updateAttendenceInput: {
                id: editingItem.id,
                date: value.date,
              },
            },
          })

          if (response?.data) {
            handleClose()
            form.reset()
            toast.success('Ata atualizada com sucesso')
          }
        } catch (error) {
          console.error(error)
          toast.error('Erro ao atualizar ata')
        } finally {
          setIsLoadingEdit(false)
        }
      },
    },
  })

  return form
}
