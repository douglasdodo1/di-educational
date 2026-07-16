import { Course } from '@/types/course'
import { Panel } from '../panel/Panel'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { contentIcon } from './utils'
import { ContentSectionSkeleton } from './ContentSectionSkeleton'
import { sections } from '../../utils'
import { ContentDialog } from './content-dialog/ContentDialog'
import { useState } from 'react'
import { ContentModel } from '@/types/content'
import { ContentCardList } from './content-card-list/ContentCardList'

interface OverviewSectionProps {
  course?: Course
  loading: boolean
}

export function ContentSection({ course, loading }: OverviewSectionProps) {
  const contents = course?.contents
  const sectionTitle = sections[0].label
  const [open, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentModel>()

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

  if (loading) {
    return (
      <Panel title={sectionTitle}>
        <ContentSectionSkeleton />
      </Panel>
    )
  }

  return (
    <Panel
      title={sectionTitle}
      className="flex min-h-0 flex-1 flex-col"
      openModal={handleOpenDialog}
    >
      <ContentDialog
        courseId={course?.id}
        editingItem={editingItem}
        isOpen={open}
        onClose={handleCloseDialog}
      />
      <ContentCardList contents={contents} onEdit={handleEditContent} />
    </Panel>
  )
}
