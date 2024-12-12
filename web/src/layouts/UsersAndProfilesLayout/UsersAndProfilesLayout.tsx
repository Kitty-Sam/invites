import React, { FC } from 'react'
import { Header } from '@/layouts/UsersAndProfilesLayout/Header/Header'
import { Footer } from '@/layouts/UsersAndProfilesLayout/Footer/Footer'

export interface IProps {
  children: React.ReactNode
}

export const UsersAndProfilesLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="relative mx-auto flex  min-h-screen  flex-col">
      <Header />
      <main className="flex-1 bg-muted/40 px-10 pt-10">{children}</main>
      <Footer />
    </div>
  )
}
