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

  return (
    <Dialog
      open={modalType === ModalsType.ADD_UPWORK_PROJECT_TO_PORTFOLIO}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">New Portfolio Project</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Add information about your project
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
            <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
              <span>Save</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
