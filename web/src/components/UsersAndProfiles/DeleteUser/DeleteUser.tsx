import React from 'react'
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
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'

export const DeleteUser = () => {
  const modalType = useAppSelector(getCurrentModalType)
  const userId = useAppSelector(getCurrentModalValue)

  const dispatch = useAppDispatch()

  const onCloseModal = () => {
    dispatch(clearModalValue())
    dispatch(closeModal())
  }

  return (
    <Dialog
      open={modalType === ModalsType.DELETE_UPWORK_USER}
      onOpenChange={onCloseModal}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Delete User</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Are you sure you want to delete this user?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-start space-x-4">
          <Button variant="secondary" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button variant="destructive">Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
