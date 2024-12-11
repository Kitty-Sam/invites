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
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { Button } from '@/components/ui/button'

export interface IProps {
  title: string
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'title should be at least 2 characters.',
  }),
})

type FormData = z.infer<typeof formSchema>

export const EditTitle: FC<IProps> = ({ title }) => {
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
      open={modalType === ModalsType.EDIT_UPWORK_PROFILE_TITLE}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit your title</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Enter a single sentence description of your professional
            skills/experience
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
            <Button className="bg-blue-500 hover:bg-blue-600" type="submit">
              <span>Save</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
