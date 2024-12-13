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
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'
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

export interface IProps {}

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'fullName should be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  goLoginId: z.string().min(2, {
    message: 'goLogin should be at least 2 characters.',
  }),
  specialties: z.array(z.string()),
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

export const EditUser: FC<IProps> = () => {
  const modalType = useAppSelector(getCurrentModalType)
  const user = useAppSelector(getCurrentModalValue)

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
      fullName: user?.name || '',
      email: user?.email || '',
      goLoginId: user?.goLoginId || '',
      specialties: user?.specialties || [],
    },
  })

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('')
  const [userSpecialties, setUserSpecialties] = useState<string[]>(
    user?.specialties
  )

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // dispatch(closeModal())
    reset()
  }

  useEffect(() => {
    setValue('specialties', user?.specialties)
  }, [user])

  const addSpecialty = () => {
    if (selectedSpecialty && !userSpecialties.includes(selectedSpecialty)) {
      setValue('specialties', [...userSpecialties, selectedSpecialty])
      setUserSpecialties([...userSpecialties, selectedSpecialty])
      setSelectedSpecialty('')
    }
  }

  const removeSpecialty = (specialty: string) => {
    const updatedSpecialties = userSpecialties.filter((s) => s !== specialty)
    setValue('specialties', updatedSpecialties)
    setUserSpecialties(updatedSpecialties)
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
              required
              {...register('fullName', {
                required: 'Full Name is required',
              })}
              defaultValue={user?.name}
            />
            {errors.fullName && (
              <span className="text-sm text-red-500">
                {errors.fullName.message}
              </span>
            )}
          </div>
          <div className="grid gap-2">
            <InputCustom
              id="email"
              type="email"
              label="E-mail"
              required
              {...register('email', {
                required: 'E-mail is required',
              })}
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
              required
              {...register('goLoginId', {
                required: 'GoLoginId is required',
              })}
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
              {userSpecialties.map((profile) => (
                <Badge
                  key={profile}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {profile}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeSpecialty(profile)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select
                value={selectedSpecialty}
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a specialty" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_SPECIALTIES.filter(
                    (specialty) => !getValues('specialties').includes(specialty)
                  ).map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                className="shrink-0"
                onClick={addSpecialty}
                disabled={!selectedSpecialty}
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
