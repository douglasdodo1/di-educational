import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface NavigationMenuProps {
  onBack: () => void
  leftText?: string
  rightText?: string
}

export const NavigationMenu = ({ onBack, leftText, rightText }: NavigationMenuProps) => {
  return (
    <Card className="w-full flex-row justify-between px-4">
      <Button variant="outline" onClick={onBack} className="cursor-pointer">
        <ArrowLeft className="size-4" />
        <p>{leftText}</p>
      </Button>

      <Button variant="outline" className="cursor-pointer gap-2">
        <p>{rightText}</p>
        <ArrowRight className="size-4" />
      </Button>
    </Card>
  )
}
