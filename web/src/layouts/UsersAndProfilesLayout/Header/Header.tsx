import React from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { UserAvatar } from '@/components/shared/UserAvatar/UserAvatar'

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
            <div className="flex items-center space-x-1">
              <a
                href="/agency"
                className="flex items-center font-medium transition-colors hover:text-foreground/80"
              >
                Agency
              </a>
              <ChevronDown className="h-4 w-4" />
            </div>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
          <UserAvatar />
        </div>
      </div>
    </header>
  )
}
