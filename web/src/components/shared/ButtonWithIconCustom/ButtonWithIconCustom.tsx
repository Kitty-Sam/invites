import React, { FC } from 'react'
import { Button } from '@/components/ui/button'

export interface IProps {
  src: string
  title: string
  onClick: any
}

export const ButtonWithIconCustom: FC<IProps> = ({ src, title, onClick }) => {
  return (
    <Button className="bg-blue-500 hover:bg-blue-600" onClick={onClick}>
      <img src={src} alt={title} className="h-5 w-5" />
      <span>{title}</span>
    </Button>
  )
}