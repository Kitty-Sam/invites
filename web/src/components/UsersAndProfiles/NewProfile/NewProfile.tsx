import React, { FC } from 'react'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import { closeModal, ModalsType } from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'

export interface IProps {}

const formSchema = z.object({})

type FormData = z.infer<typeof formSchema>

export const NewProfile: FC<IProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const modalType = useAppSelector(getCurrentModalType)
  const dispatch = useDispatch()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('data', data)
    dispatch(closeModal())
    reset()
  }

  return (
    <Dialog
      open={modalType === ModalsType.ADD_UPWORK_PROFILE}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Profile</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here you can add Upwork profiles
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
