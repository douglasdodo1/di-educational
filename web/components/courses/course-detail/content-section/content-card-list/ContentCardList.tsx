import { ContentModel } from '@/types/content'
import { Card } from '@/components/ui/card'
import { contentIcon } from '../utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'

interface ContentCardListProps {
  contents?: ContentModel[]
  onEdit: (event: React.MouseEvent<HTMLButtonElement>, content: ContentModel) => void
}

export const ContentCardList = ({ contents, onEdit }: ContentCardListProps) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
      {contents?.map((content, index) => {
        const Icon = contentIcon(content.type)
        return (
          <Link key={index} href={`/content/${content.id}`} className="block cursor-pointer">
            <Card className="hover:bg-accent/50 flex cursor-pointer flex-row items-center justify-between gap-4 p-6">
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-lg font-bold">{content.name}</p>
                <p className="text-md text-muted-foreground">{content.description}</p>
              </div>

              <div className="bg-muted text-muted-foreground flex items-center justify-center gap-3 rounded-full p-2">
                <Icon className="text-primary cursor-default" />
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  onClick={(event) => onEdit(event, content)}
                >
                  <Edit />
                </Button>
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
