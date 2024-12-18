import React, { FC, useEffect, useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'
import { IUser } from '@/interfaces/user.interface'

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: 'fullName should be at least 2 characters.',
    })
    .optional(),
  upworkUserId: z
    .string()
    .min(2, {
      message: 'Upwork User Id should be at least 2 characters.',
    })
    .optional(),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.',
    })
    .optional(),
  goLoginId: z
    .string()
    .min(2, {
      message: 'goLogin should be at least 2 characters.',
    })
    .optional(),
  upworkProfiles: z.array(z.number()),
})

type FormData = z.infer<typeof formSchema>

export const AVAILABLE_SPECIALTIES = [
  'Web Design',
  'UX design',
  'Frontend development',
  'Machine Learning',
  'Product Management',
  'Marketing Strategy',
  '3D Animation',
  'Lead generation',
]

export type IProps = {
  user: IUser
  handleUpdateUpworkUser: (
    id: number,
    email?: string,
    upworkUserId?: string,
    userName?: string,
    goLoginId?: string,
    profileIds?: number[]
  ) => void
  profiles: { id: number; title: string }[]
}

export const EditUser = ({
  user,
  handleUpdateUpworkUser,
  profiles,
}: IProps) => {
  const modalType = useAppSelector(getCurrentModalType)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: user?.userName || '',
      email: user?.email || '',
      goLoginId: user?.goLoginId || '',
      upworkProfiles: user?.upworkProfiles.map((pr) => pr.id) || [],
    },
  })

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | null>(
    null
  )
  const [userSpecialtyIds, setUserSpecialtyIds] = useState<number[]>(
    user?.upworkProfiles.map((pr) => pr.id)
  )

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleUpdateUpworkUser(
      user.id,
      data.email,
      data.upworkUserId,
      data.fullName,
      data.goLoginId,
      data.upworkProfiles
    )
    dispatch(closeModal())
    reset()
  }

  const addSpecialty = () => {
    if (
      selectedSpecialtyId &&
      !userSpecialtyIds.includes(Number(selectedSpecialtyId))
    ) {
      setValue('upworkProfiles', [
        ...userSpecialtyIds,
        Number(selectedSpecialtyId),
      ])
      setUserSpecialtyIds([...userSpecialtyIds, Number(selectedSpecialtyId)])
      setSelectedSpecialtyId('')
    }
  }

  const removeSpecialty = (specialtyId: number) => {
    const updatedSpecialties = userSpecialtyIds.filter(
      (sId) => sId !== specialtyId
    )
    setValue('upworkProfiles', updatedSpecialties)
    setUserSpecialtyIds(updatedSpecialties)
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.EDIT_UPWORK_USER}
      modalTitle={'Edit User'}
      modalDescription={'Here you can edit Upwork user'}
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
              id="fullName"
              type="text"
              label="User Name"
              {...register('fullName')}
              defaultValue={user?.userName}
            />
            {errors.fullName && (
              <span className="text-sm text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <InputCustom
              id="upworkUserId"
              type="text"
              label="Upwork User ID"
              {...register('upworkUserId')}
              defaultValue={user?.upworkUserId}
            />
            {errors.upworkUserId && (
              <span className="text-sm text-red-500">
                {errors.upworkUserId.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <InputCustom
              id="email"
              type="email"
              label="E-mail"
              {...register('email')}
              defaultValue={user?.email}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <InputCustom
              id="goLoginId"
              type="text"
              label="Gologin ID"
              {...register('goLoginId')}
              defaultValue={user?.goLoginId}
            />
            {errors.goLoginId && (
              <span className="text-sm text-red-500">
                {errors.goLoginId.message}
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Specialized profiles</label>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {userSpecialtyIds.map((id) => (
                <Badge
                  key={id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {profiles.find((el) => el.id === id).title}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSpecialty(id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedSpecialtyId}
                onValueChange={setSelectedSpecialtyId}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a specialty" />
                </SelectTrigger>
                <SelectContent>
                  {profiles.map((specialty) => (
                    <SelectItem key={specialty.id} value={String(specialty.id)}>
                      {specialty.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                className="shrink-0"
                onClick={addSpecialty}
                disabled={!selectedSpecialtyId}
              >
                Add
              </Button>
            </div>
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
