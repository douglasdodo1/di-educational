import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Content } from '@/types/content'

interface SelectFormContentProps {
  contents?: Content[]
  value?: string
  onValueChange: (value: string) => void
}

export const SelectFormContent = ({ contents, value, onValueChange }: SelectFormContentProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um conteúdo relacionado" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {contents?.map((content) => (
            <SelectItem key={content.id} value={content.id.toString()}>
              {content.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
