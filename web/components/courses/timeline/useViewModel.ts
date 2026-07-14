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
  const [openModal, setOpenModal] = useState(false)
  const [editingItem, setEditingItem] = useState<TimelineModel>()

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

  return {
    timelines,
    loading,
    error,
    openModal,
    editingItem,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleChecked,
  }
}
