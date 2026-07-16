import { ContentModel } from '@/types/content'
import Image from 'next/image'

interface LessonContentProps {
  content?: ContentModel
}

export const LessonContent = ({ content }: LessonContentProps) => {
  const src = content?.url || '/placeholder.svg'

  if (!content) {
    return (
      <div className="border-border bg-secondary w-4/6 overflow-hidden rounded-xl border">
        Content not found
      </div>
    )
  }

  if (content.type === 'VIDEO') {
    return (
      <div className="w-4/6">
        <video controls className="aspect-video w-full" preload="metadata">
          <source src={src} type="video/mp4" />
          Seu navegador não suporta a reprodução de vídeo.
        </video>
      </div>
    )
  }

  if (content.type === 'PDF') {
    return (
      <div className="border-border bg-secondary w-4/6 overflow-hidden rounded-xl border">
        <iframe src={src} title="Conteúdo da aula" className="h-[60vh] w-full" />
      </div>
    )
  }

  if (content.type === 'IMAGE') {
    return (
      <div className="border-border bg-secondary relative overflow-hidden rounded-xl border">
        <div className="relative aspect-video w-full">
          <Image
            src={src}
            alt="Conteúdo da aula"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="border-border bg-secondary w-4/6 overflow-hidden rounded-xl border">
      <p className="text-muted-foreground text-center">Tipo de conteúdo não suportado</p>
    </div>
  )
}
