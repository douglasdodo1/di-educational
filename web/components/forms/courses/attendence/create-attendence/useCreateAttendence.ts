import { useCreateAttendenceMutation } from '@/hooks/attendences/useCreateAttendenceMutation'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

interface CreateAttendenceFormValues {
  date: Date
}

interface CreateAttendenceProps {
  courseId?: string
  handleClose: () => void
}

export const useCreateAttendence = ({ courseId, handleClose }: CreateAttendenceProps) => {
  const { createAttendence } = useCreateAttendenceMutation(courseId)

  const form = useForm({
    defaultValues: {
      date: new Date(),
    } as CreateAttendenceFormValues,

    validators: {
      onSubmitAsync: async ({ value }) => {
        try {
          console.log('aquiiii')

          const response = await createAttendence({
            variables: {
              createAttendenceInput: {
                date: value.date,
                courseId: Number(courseId),
              },
            },
          })

          if (response?.data) {
            handleClose()
            form.reset()
            toast.success('Ata criada com sucesso')
          }
        } catch (error) {
          console.error(error)
          toast.error('Erro ao criar ata')
        }
      },
    },
  })

  return form
}
