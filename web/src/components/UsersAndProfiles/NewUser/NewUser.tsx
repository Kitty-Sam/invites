import React, { FC } from 'react'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { useDispatch } from 'react-redux'
import {
  clearModalValue,
  closeModal,
  ModalsType,
} from '@/store/reducers/modalReducer'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'

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

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('data', data)
    dispatch(closeModal())
    reset()
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.ADD_UPWORK_USER}
      modalTitle={'Add User'}
      modalDescription={'Here you can add Upwork users'}
      onOpenChange={onCloseModal}
    >
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
    </DialogWrapper>
  )
}
