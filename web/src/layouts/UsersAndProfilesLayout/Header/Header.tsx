import React from 'react'
import { ChevronDown, Settings, Target, Users, Zap } from 'lucide-react'
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar'
import { SearchInputCustom } from '@/components/shared/SearchInputCustom/SearchInputCustom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const Header = () => {
  return (
    <header className="w-full border-b bg-background/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center">
        <div className="flex items-center space-x-10">
          <img src="/menu.png" alt="Menu" className="h-5 w-5" />
          <nav className="flex items-center space-x-20 text-sm">
            <span className="font-medium transition-colors">Leads</span>
            <div className="flex items-center space-x-1">
              <a
                href="/reports"
                className="flex items-center font-medium transition-colors hover:text-foreground/80"
              >
                Reports
              </a>
              <ChevronDown className="h-4 w-4" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 font-medium transition-colors hover:text-foreground/80 focus:outline-none">
                <span>Agency</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  Agency Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Target className="mr-2 h-4 w-4" />
                  Value Propositions
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  ICP Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Zap className="mr-2 h-4 w-4" />
                  Automatization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative mt-4">
            <SearchInputCustom />
          </div>
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}
