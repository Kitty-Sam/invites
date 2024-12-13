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
  projectTitle: z.string().min(2, {
    message: 'projectTitle should be at least 2 characters.',
  }),
  role: z.string().min(2, {
    message: 'role should be at least 2 characters.',
  }),
  content: z.any(),
})

type FormData = z.infer<typeof formSchema>

export const NewPortfolioProject: FC<IProps> = () => {
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

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.ADD_UPWORK_PROJECT_TO_PORTFOLIO}
      modalTitle={'New Portfolio Project'}
      modalDescription={' Add information about your project'}
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
              id="projectTitle"
              type="text"
              label="Project Title"
              required
              {...register('projectTitle', {
                required: 'Project Title is required',
              })}
            />
            {errors.projectTitle && (
              <span className="text-sm text-red-500">
                {errors.projectTitle.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <InputCustom
              id="role"
              type="text"
              label="Your role"
              required
              {...register('role', {
                required: 'Your role is required',
              })}
            />
            {errors.role && (
              <span className="text-sm text-red-500">
                {errors.role.message}
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
