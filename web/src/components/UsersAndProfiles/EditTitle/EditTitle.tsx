import React from 'react'
import * as z from 'zod'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import {
  clearModalValue,
  closeModal,
  ModalsType,
} from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { Button } from '@/components/ui/button'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'
import { IProfile } from '@/interfaces/profile.interface'

export interface IProps {
  oldProfile: IProfile
  handleUpdateUpworkProfile: (
    id: number,
    title?: string,
    valueProposition?: string
  ) => void
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'title should be at least 2 characters.',
  }),
})

type FormData = z.infer<typeof formSchema>

export const EditTitle = ({
  handleUpdateUpworkProfile,
  oldProfile,
}: IProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const modalType = useAppSelector(getCurrentModalType)
  const dispatch = useDispatch()

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    handleUpdateUpworkProfile(oldProfile.id, data.title)
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
              {...register('title')}
              defaultValue={oldProfile.title}
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
