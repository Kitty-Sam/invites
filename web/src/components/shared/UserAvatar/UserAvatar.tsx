import React, { FC } from 'react'
import {
  UserCircle,
  User,
  CreditCard,
  Settings,
  HelpCircle,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface IProps {
  src?: string
  fallback?: string
  className?: string
}

export const UserAvatar: FC<IProps> = ({ className, fallback, src }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className={className}>
          <AvatarImage src={src} alt="User avatar" />
          <AvatarFallback className="bg-muted">
            {fallback ? (
              <span className="text-xs font-medium">{fallback}</span>
            ) : (
              <UserCircle className="h-4 w-4" />
            )}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard className="mr-2 h-4 w-4" />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HelpCircle className="mr-2 h-4 w-4" />
          Support
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
