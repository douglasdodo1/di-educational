import { useAttendences } from '@/hooks/attendences/useAttendencesByCourseId'
import { AttendenceModel } from '@/types/attendence'
import { useState } from 'react'

interface useViewModelProps {
  courseId?: string
}

export const useViewModel = ({ courseId }: useViewModelProps) => {
  const { attendences, loading } = useAttendences(courseId)
  const [openDialog, setIsOpen] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<AttendenceModel>()

  const handleOpenCreateDialog = () => {
    setIsOpen(true)
  }

  const handleOpenEditDialog = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: AttendenceModel,
  ) => {
    event.preventDefault()
    event.stopPropagation()
    setIsOpen(true)
    setEditingItem(item)
  }

  const handleCloseDialog = () => {
    setIsOpen(false)
    setEditingItem(undefined)
  }

  return {
    attendences,
    loading,
    openDialog,
    editingItem,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
  }
}
