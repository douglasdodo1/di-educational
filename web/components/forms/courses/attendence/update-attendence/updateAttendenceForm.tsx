import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { AttendenceModel } from '@/types/attendence'
import { useUpdateAttendence } from './useUpdateAttendence'
import { Spinner } from '@/components/ui/spinner'
import { Button } from '@/components/ui/button'

interface UpdateAttendenceProps {
  handleClose: () => void
  editingItem: AttendenceModel
}

export const UpdateAttendenceForm = ({ handleClose, editingItem }: UpdateAttendenceProps) => {
  const form = useUpdateAttendence({ editingItem, handleClose })

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
            {isSubmitting ? <Spinner /> : 'Atualizar data'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  )
}
