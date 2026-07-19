import { useAttendences } from '@/hooks/attendences/useAttendencesByCourseId'
import { useDeleteAttendenceMutation } from '@/hooks/attendences/useDeleteAttendenceMutation'
import { AttendenceModel } from '@/types/attendence'
import { useState } from 'react'

interface useViewModelProps {
  courseId?: string
}

export const useViewModel = ({ courseId }: useViewModelProps) => {
  const { attendences, loading } = useAttendences(courseId)
  const [openDialog, setIsOpen] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<AttendenceModel>()
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [deleteAttendence, { loading: deleteLoading }] = useDeleteAttendenceMutation(courseId)
  const isLoading = isLoadingEdit || deleteLoading

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

  const handleDeleteAttendence = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault()
    event.stopPropagation()
    deleteAttendence({ variables: { id } })
  }

  return {
    attendences,
    loading,
    openDialog,
    editingItem,
    isLoading,
    setIsLoadingEdit,
    handleOpenCreateDialog,
    handleOpenEditDialog,
    handleCloseDialog,
    handleDeleteAttendence,
  }
}
