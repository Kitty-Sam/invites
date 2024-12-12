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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { AVAILABLE_SPECIALTIES } from '@/components/UsersAndProfiles/EditUser/EditUser'
import { Button } from '@/components/ui/button'

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

  const onProfileSpecialityChange = (value: string) => {
    setValue('speciality', value)
  }

  return (
    <Dialog
      open={modalType === ModalsType.ADD_UPWORK_PROFILE}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Profile</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Here you can add Upwork profiles
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
