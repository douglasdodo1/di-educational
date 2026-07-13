import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { useTimeline } from './useTimeline'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Content } from '@/types/content'

interface CreatetTimelineProps {
  courseId?: string
  contents?: Content[]
}

export const CreateTimelineForm = ({ courseId, contents }: CreatetTimelineProps) => {
  const form = useTimeline()

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
                value={field.state.value?.toISOString().split('T')[0]}
                onChange={(e) => field.handleChange(new Date(e.target.value))}
              />
            </Field>
          )}
        </form.Field>
        <form.Field name="contentId">
          {(field) => (
            <Field>
              <FieldLabel>Conteúdo relacionado</FieldLabel>
              <Select
                options={contents?.map((content) => ({
                  value: content.id.toString(),
                  label: content.name,
                }))}
                value={field.state.value?.toString()}
                onValueChange={(value) => field.handleChange(value)}
              />
            </Field>
          )}
        </form.Field>
      </FieldGroup>
    </form>
  )
}
