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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { AVAILABLE_SPECIALTIES } from '@/components/UsersAndProfiles/EditUser/EditUser'
import { Button } from '@/components/ui/button'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'

export interface IProps {}

const formSchema = z.object({
  speciality: z.string().min(2, {
    message: 'Speciality must be at least 2 characters.',
  }),
})

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

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  const onProfileSpecialityChange = (value: string) => {
    setValue('speciality', value)
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.ADD_UPWORK_PROFILE}
      modalTitle={'Add Profile'}
      modalDescription={'Here you can add Upwork profiles'}
      onOpenChange={onCloseModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="space-y-1">
          <label htmlFor="speciality" className="block text-sm font-medium">
            Specialized profiles
          </label>
          <Select onValueChange={onProfileSpecialityChange} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a speciality" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {AVAILABLE_SPECIALTIES.map((el) => (
                <SelectItem value={el} key={el}>
                  {el}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="default" type="submit">
            Save
          </Button>
        </div>
      </form>
    </DialogWrapper>
  )
}
