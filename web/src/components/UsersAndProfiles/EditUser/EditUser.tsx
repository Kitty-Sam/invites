import React, { FC } from 'react'
import * as z from 'zod'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { IUser } from '@/interfaces/user.interface'
import { useDispatch } from 'react-redux'
import { closeModal, ModalsType } from '@/store/reducers/modalReducer'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'

export interface IProps {
  user: IUser
}

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'fullName should be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  goLoginId: z.string().min(2, {
    message: 'goLogin should be at least 2 characters.',
  }),
  specializedProfiles: z.array(z.string()),
})

type FormData = z.infer<typeof formSchema>

const EditUser: FC<IProps> = ({ user }) => {
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
      open={modalType === ModalsType.EDIT_UPWORK_USER}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit User</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here you can edit Upwork user
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <InputCustom
                id="fullName"
                type="text"
                label="User Name"
                required
                {...register('fullName', {
                  required: 'Full Name is required',
                })}
                defaultValue={user?.name}
              />
              {errors.fullName && (
                <span className="text-sm text-red-500">
                  {errors.fullName.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <InputCustom
                id="email"
                type="email"
                label="E-mail"
                required
                {...register('email', {
                  required: 'E-mail is required',
                })}
                defaultValue={user?.email}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <InputCustom
                id="goLoginId"
                type="text"
                label="Gologin ID"
                required
                {...register('goLoginId', {
                  required: 'GoLoginId is required',
                })}
                defaultValue={user?.goLoginId}
              />
              {errors.goLoginId && (
                <span className="text-sm text-red-500">
                  {errors.goLoginId.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
              <span>Save</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUser
