'use client'
import { useState } from 'react'
import { ContentModel } from '@/types/content'
import { Course } from '@/types/course'
import { useDeleteContentMutation } from '@/hooks/contents/useDeleteContentMutation'

export const useViewModel = (course?: Course) => {
  const contents = course?.contents
  const [open, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentModel>()
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [deleteContent, { loading: deleteLoading }] = useDeleteContentMutation()
  const isLoading = isLoadingEdit || deleteLoading

  const handleDeleteContent = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault()
    deleteContent({ variables: { id } })
  }

  const handleOpenDialog = () => {
    setIsOpen(true)
  }

  const handleCloseDialog = () => {
    setIsOpen(false)
    setEditingItem(undefined)
  }

  const handleEditContent = (event: React.MouseEvent<HTMLButtonElement>, content: ContentModel) => {
    event.preventDefault()
    setEditingItem(content)
    setIsOpen(true)
  }

  return {
    contents,
    open,
    editingItem,
    isLoading,
    isLoadingEdit,
    setIsLoadingEdit,
    handleDeleteContent,
    handleOpenDialog,
    handleCloseDialog,
    handleEditContent,
  }
}
