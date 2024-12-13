import React from 'react'
import {
  clearModalValue,
  closeModal,
  ModalsType,
} from '@/store/reducers/modalReducer'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'

export const DeleteProfile = () => {
  const modalType = useAppSelector(getCurrentModalType)
  const profileId = useAppSelector(getCurrentModalValue)

  const dispatch = useAppDispatch()

  const onCloseModal = () => {
    dispatch(clearModalValue())
    dispatch(closeModal())
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.DELETE_UPWORK_PROFILE}
      onOpenChange={onCloseModal}
      modalDescription={'Are you sure you want to delete this profile?'}
      modalTitle={'Delete Profile'}
    >
      <div className="flex justify-start space-x-4">
        <Button variant="secondary" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </DialogWrapper>
  )
}
