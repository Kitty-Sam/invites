import React, { FC, ReactNode } from 'react'
import { ModalsType } from '@/store/reducers/modalReducer'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog'

export interface IProps {
  children: ReactNode
  open: boolean
  modalTitle: string
  modalDescription: string
  onOpenChange: () => void
}

export const DialogWrapper: FC<IProps> = ({
  children,
  modalTitle,
  modalDescription,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{modalTitle}</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {modalDescription}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
