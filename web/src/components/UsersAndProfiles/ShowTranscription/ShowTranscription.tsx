import React, { FC } from 'react'
import {
  clearModalValue,
  closeModal,
  ModalsType,
} from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'

export interface IProps {}

export const ShowTranscription = ({}: IProps) => {
  const modalType = useAppSelector(getCurrentModalType)
  const transcription = useAppSelector(getCurrentModalValue)

  const dispatch = useDispatch()

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.SHOW_INTERVIEW_TRANSCRIPTION}
      modalTitle={'Transcription'}
      modalDescription={'Here you can see transcription'}
      onOpenChange={onCloseModal}
    >
      <>
        {transcription.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </>
    </DialogWrapper>
  )
}
