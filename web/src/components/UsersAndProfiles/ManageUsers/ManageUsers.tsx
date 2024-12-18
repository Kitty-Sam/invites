import React, { useState } from 'react'
import {
  clearModalValue,
  closeModal,
  ModalsType,
} from '@/store/reducers/modalReducer'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'
import { Button } from '@/components/ui/button'
import { CircleX, UserPlus } from 'lucide-react'
import { SearchInputCustom } from '@/components/shared/SearchInputCustom/SearchInputCustom'
import { DialogWrapper } from '@/components/shared/DialogWrapper/DialogWrapper'
import { IProfile } from '@/interfaces/profile.interface'
import { IUser } from '@/interfaces/user.interface'

export interface IProps {
  users: IUser[]
  oldProfile: IProfile
  handleUpdateUpworkProfile: (
    id: number,
    title?: string,
    valueProposition?: string,
    userIds?: number[]
  ) => void
}

export const ManageUsers = ({
  oldProfile,
  handleUpdateUpworkProfile,
  users,
}: IProps) => {
  const modalType = useAppSelector(getCurrentModalType)
  const dispatch = useDispatch()

  const [selectedUsers, setSelectedUsers] = useState(oldProfile.upworkUsers)
  const [selectedUserIds, setSelectedUserIds] = useState(
    oldProfile.upworkUsers.map((u) => u.id)
  )

  const onCloseModal = () => {
    dispatch(closeModal())
    dispatch(clearModalValue())
  }

  const onManageUserClick = () => {
    onCloseModal()
    handleUpdateUpworkProfile(
      oldProfile.id,
      undefined,
      undefined,
      selectedUserIds
    )
  }

  return (
    <DialogWrapper
      open={modalType === ModalsType.MANAGE_UPWORK_USERS}
      modalTitle={'Manage Users'}
      modalDescription={'You can add up to 3 users'}
      onOpenChange={onCloseModal}
    >
      <>
        <div className="space-x-3">
          {selectedUsers.map((user, index: number) => (
            <div
              className="inline-flex items-center space-x-2 rounded bg-gray-100 px-3 py-1 text-sm text-black"
              key={user.userName}
              onClick={() => {
                const newUsers = [...selectedUsers]
                const newUserIds = [...selectedUserIds]
                newUsers.splice(index, 1)
                newUserIds.splice(index, 1)
                setSelectedUsers(newUsers)
                setSelectedUserIds(newUserIds)
              }}
            >
              <span>{user.userName}</span>
              <CircleX className="h-4 w-4" />
            </div>
          ))}
        </div>
        <div className="relative">
          <SearchInputCustom />
        </div>
        <div>
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between  border-b p-4"
            >
              <div>
                <p className="text-sm font-medium leading-none">
                  {user.userName}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  if (user && !selectedUserIds.some((id) => id === user.id)) {
                    setSelectedUserIds([...selectedUserIds, user.id])
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
          <Button variant="default" onClick={onManageUserClick}>
            Save
          </Button>
        </div>
      </>
    </DialogWrapper>
  )
}
