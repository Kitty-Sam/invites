import React, { FC } from 'react'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { closeModal, ModalsType } from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'

export interface IProps {
  transcription: string[]
}

export const ShowTranscription: FC<IProps> = ({ transcription }) => {
  const modalType = useAppSelector(getCurrentModalType)
  const dispatch = useDispatch()

  return (
    <Dialog
      open={modalType === ModalsType.SHOW_INTERVIEW_TRANSCRIPTION}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Transcription</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here you can see transcription
          </DialogDescription>
        </DialogHeader>
        <p>hello</p>
      </DialogContent>
    </Dialog>
  )
}
