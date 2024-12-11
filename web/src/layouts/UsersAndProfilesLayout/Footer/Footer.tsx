import React from 'react'

export const Footer = () => {
  return (
    <footer className="w-full px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/menu.png" alt="Menu" className="h-5 w-5" />
        </div>

        <nav className="flex items-center space-x-10">
          <a
            href="/docs"
            className="text-sm text-gray-500 transition-colors hover:text-foreground/80"
          >
            Docs
          </a>
          <a
            href="/faq"
            className="text-sm text-gray-500 transition-colors hover:text-foreground/80"
          >
            FAQ
          </a>
          <a
            href="/contacts"
            className="text-sm text-gray-500 transition-colors hover:text-foreground/80"
          >
            Contacts
          </a>
        </nav>

        <div className="text-sm text-muted-foreground">
          prostoemail@gmail.com
        </div>
      </div>
    </footer>
  )
}
