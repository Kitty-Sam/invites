import { User } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { FC } from 'react'

interface IProps {
  src?: string
  fallback?: string
  className?: string
}

export const UserAvatar: FC<IProps> = ({ className, fallback, src }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt="User avatar" />
      <AvatarFallback className="bg-muted">
        {fallback ? (
          <span className="text-xs font-medium">{fallback}</span>
        ) : (
          <User className="h-4 w-4" />
        )}
      </AvatarFallback>
    </Avatar>
  )
}
