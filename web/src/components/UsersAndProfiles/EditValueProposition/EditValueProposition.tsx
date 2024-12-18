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
import { getCurrentModalType } from '@/store/selectors'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
  valueProposition: z.string().min(2, {
    message: 'title should be at least 2 characters.',
  }),
})

type FormData = z.infer<typeof formSchema>

export const EditValueProposition = ({
  oldProfile,
  handleUpdateUpworkProfile,
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
    handleUpdateUpworkProfile(oldProfile.id, undefined, data.valueProposition)
    onCloseModal()
    reset()
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.EDIT_UPWORK_VALUE_PROPOSITION}
      modalTitle={'Edit value proposition'}
      modalDescription={'Enter your professional value proposition'}
      onOpenChange={onCloseModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <label htmlFor="message">Value Proposition</label>
            <Textarea
              id="valueProposition"
              placeholder="Enter your value proposition here"
              className="min-h-[200px]"
              {...register('valueProposition')}
              defaultValue={oldProfile.valueProposition}
            />
          </div>

          {errors.valueProposition && (
            <span className="text-sm text-red-500">
              {errors.valueProposition.message}
            </span>
          )}
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
