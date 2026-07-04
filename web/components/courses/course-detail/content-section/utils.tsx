import { FileText, ImageIcon, PlayCircle } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

export const contentIcon = (type?: string): ComponentType<SVGProps<SVGSVGElement>> => {
  const normalizedType = type?.toUpperCase()

  switch (normalizedType) {
    case 'VIDEO':
      return PlayCircle
    case 'PDF':
      return FileText
    case 'IMAGE':
      return ImageIcon
    default:
      return FileText
  }
}
