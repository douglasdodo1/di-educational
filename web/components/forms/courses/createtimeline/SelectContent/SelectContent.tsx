import { Select } from '@/components/ui/select'
import { Content } from '@/types/content'

interface SelectFormProps {
  items: Content[]
}

export const SelectForm = ({ items }: SelectFormProps) => {
  return <Select items={items}></Select>
}
