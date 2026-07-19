import { useDeleteTimelineMutation } from '@/hooks/timelines/useDeleteTimelineMutation'
import { useTimelinesByCourseId } from '@/hooks/timelines/useTimelinesByCourseId'
import { useUpdateIsdoneTimelineMutation } from '@/hooks/timelines/useUpdateIsdoneTimelineMutation'
import { TimelineModel } from '@/types/timelineModel'
import { useState } from 'react'
import { toast } from 'sonner'

interface useViewModelProps {
  courseId?: string
}

export const useViewModel = ({ courseId }: useViewModelProps) => {
  const { timelines, loading, error } = useTimelinesByCourseId(courseId)
  const { updateIsdoneTimeline } = useUpdateIsdoneTimelineMutation()
  const [deleteTimeline, { loading: deleteLoading }] = useDeleteTimelineMutation(courseId)
  const [openModal, setOpenModal] = useState(false)
  const [editingItem, setEditingItem] = useState<TimelineModel>()
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const isLoading = isLoadingEdit || deleteLoading

  const handleOpenCreateModal = () => {
    setOpenModal(true)
  }

  const handleCloseCreateModal = () => {
    setOpenModal(false)
    setEditingItem(undefined)
  }

  const handleOpenEditModal = (item: TimelineModel) => {
    setOpenModal(true)
    setEditingItem(item)
  }

  const handleChecked = async (id: number, is_done: boolean) => {
    try {
      const response = await updateIsdoneTimeline({
        variables: {
          id,
          data: { is_done },
        },
      })

      if (response.data) {
        toast.success('cronograma atualizado com sucesso!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTimeline = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault()
    event.stopPropagation()
    deleteTimeline({ variables: { id } })
  }

  return {
    timelines,
    loading,
    error,
    openModal,
    editingItem,
    isLoading,
    setIsLoadingEdit,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleChecked,
    handleDeleteTimeline,
  }
}
