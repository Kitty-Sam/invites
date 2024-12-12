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
import {
  clearModalValue,
  closeModal,
  ModalsType,
  saveModalValue,
  showModal,
} from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'
import { Button } from '@/components/ui/button'
import { CircleX, Search, UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { SearchInputCustom } from '@/components/shared/SearchInputCustom/SearchInputCustom'

const allUsers = [
  {
    id: '1',
    name: 'Yuriy R.',
    email: 'qwe@gmail.com',
  },
  {
    id: '2',
    name: 'Julia B.',
    email: 'qwe123@gmail.com',
  },
  {
    id: '3',
    name: 'John S.',
    email: 'qwe234@gmail.com',
  },
  {
    id: '4',
    name: 'Monica J.',
    email: 'qwe456@gmail.com',
  },
]

export interface IProps {}

const formSchema = z.object({
  users: z.array(
    z.object({
      name: z.string(),
      email: z.string().email(),
    })
  ),
})

type FormData = z.infer<typeof formSchema>

export const ManageUsers: FC<IProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const modalType = useAppSelector(getCurrentModalType)
  const users = useAppSelector(getCurrentModalValue)
  const dispatch = useDispatch()

  const [selectedUsers, setSelectedUsers] = React.useState(users)

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
    <Dialog
      open={modalType === ModalsType.MANAGE_UPWORK_USERS}
      onOpenChange={onCloseModal}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Manage Users</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            You can add up to 3 users
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-3">
          {selectedUsers.map(
            (user: { name: string; email: string }, index: number) => (
              <div
                className="inline-flex items-center space-x-2 rounded bg-gray-100 px-3 py-1 text-sm text-black"
                key={user.name}
                onClick={() => {
                  const newUsers = [...selectedUsers]
                  newUsers.splice(index, 1)
                  setSelectedUsers(newUsers)
                }}
              >
                <span>{user.name}</span>
                <CircleX className="h-4 w-4" />
              </div>
            )
          )}
        </div>
        <div className="relative">
          <SearchInputCustom />
        </div>
        <div>
          {allUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between  border-b p-4"
            >
              <div>
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  if (
                    selectedUsers.length < 3 &&
                    user &&
                    !selectedUsers.some(
                      (selectedUser) => selectedUser.email === user.email
                    )
                  ) {
                    setSelectedUsers([...selectedUsers, user])
                  }
                }}
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button variant="default" type="submit">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
