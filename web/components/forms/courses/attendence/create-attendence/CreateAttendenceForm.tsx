import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { useCreateAttendence } from './useCreateAttendence'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

interface CreateAttendenceProps {
  courseId?: string
  handleClose: () => void
}

export const CreateAttendenceForm = ({ courseId, handleClose }: CreateAttendenceProps) => {
  const form = useCreateAttendence({ courseId, handleClose })

  const toInputDateValue = (value: unknown) =>
    value instanceof Date ? value.toISOString().split('T')[0] : ''

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field name="date">
          {(field) => (
            <Field>
              <FieldLabel className="text-base font-medium text-gray-700">Data</FieldLabel>
              <Input
                className="py-5"
                type="date"
                value={toInputDateValue(field.state.value)}
                onChange={(e) => field.handleChange(new Date(e.target.value))}
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className="mt-4 w-full cursor-pointer"
          >
            {isSubmitting ? <Spinner /> : 'Criar'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
