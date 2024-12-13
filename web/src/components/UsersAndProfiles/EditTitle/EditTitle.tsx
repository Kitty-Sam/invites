import React, { FC } from 'react'
import * as z from 'zod'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import {
  clearModalValue,
  closeModal,
  ModalsType,
} from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { Button } from '@/components/ui/button'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'

export interface IProps {}

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'title should be at least 2 characters.',
  }),
})

type FormData = z.infer<typeof formSchema>

export const EditTitle: FC<IProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const modalType = useAppSelector(getCurrentModalType)
  const title = useAppSelector(getCurrentModalValue)
  const dispatch = useDispatch()

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('data', data)
    onCloseModal()
    reset()
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.EDIT_UPWORK_PROFILE_TITLE}
      modalTitle={'Edit your title'}
      modalDescription={
        'Enter a single sentence description of your professional skills/experience'
      }
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
              id="title"
              type="text"
              label="Title"
              required
              {...register('title', {
                required: 'Title is required',
              })}
              defaultValue={title}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
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
