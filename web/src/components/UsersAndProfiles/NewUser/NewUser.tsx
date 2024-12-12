import React, { FC } from 'react'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { useDispatch } from 'react-redux'
import { closeModal, ModalsType } from '@/store/reducers/modalReducer'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'

export interface IProps {}

const formSchema = z.object({
  goLoginId: z.string().min(2, {
    message: 'goLogin should be at least 2 characters.',
  }),
})

type FormData = z.infer<typeof formSchema>

export const NewUser: FC<IProps> = () => {
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
      open={modalType === ModalsType.ADD_UPWORK_USER}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add User</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here you can add Upwork users
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
                id="goLoginId"
                type="text"
                label="Gologin ID"
                required
                {...register('goLoginId', {
                  required: 'Gologin ID is required',
                })}
              />
              {errors.goLoginId && (
                <span className="text-sm text-red-500">
                  {errors.goLoginId.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="default" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
