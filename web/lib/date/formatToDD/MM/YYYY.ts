import { format } from 'date-fns'

export const formatDate = (date: Date | string, formatString = 'dd/MM/yyyy') => {
  const dateOnly = typeof date === 'string' ? date.split('T')[0] : date.toISOString().split('T')[0]

  const [year, month, day] = dateOnly.split('-')

  return format(new Date(Number(year), Number(month) - 1, Number(day)), formatString)
}
