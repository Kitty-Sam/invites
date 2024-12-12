import React, { FC } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  clearModalValue,
  closeModal,
  ModalsType,
} from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'

export interface IProps {}

export const ShowTranscription: FC<IProps> = () => {
  const modalType = useAppSelector(getCurrentModalType)
  const transcription = useAppSelector(getCurrentModalValue)

  const dispatch = useDispatch()

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  return (
    <Dialog
      open={modalType === ModalsType.SHOW_INTERVIEW_TRANSCRIPTION}
      onOpenChange={onCloseModal}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Transcription</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here you can see transcription
          </DialogDescription>
        </DialogHeader>
        {transcription.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </DialogContent>
    </Dialog>
  )
}
