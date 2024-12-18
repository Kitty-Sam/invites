import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Share, Trash2 } from 'lucide-react'
import { IUser } from '@/interfaces/user.interface'
import { PaginationCustom } from '@/components/shared/PaginationCustom/PaginationCustom'
import { IProfile } from '@/interfaces/profile.interface'
import { EditUser } from '@/components/UsersAndProfiles/EditUser/EditUser'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'
import {
  ModalsType,
  saveModalValue,
  showModal,
} from '@/store/reducers/modalReducer'
import { DeleteUser } from '@/components/UsersAndProfiles/DeleteUser/DeleteUser'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useApolloClient } from '@apollo/client'
import {
  DELETE_UPWORK_USER_MUTATION,
  UPDATE_UPWORK_USER_MUTATION,
  UPWORK_USERS_QUERY,
} from '@/services/user.graphql.service'
import { UPWORK_PROFILES_QUERY } from '@/services/profile.graphql.service'

interface IProps {
  profiles: { id: number; title: string }[]
  users: IUser[]
  currentPage: number
  totalPages: number
  onPageChange: (value: number) => void
}

export const UsersTable = ({
  users,
  profiles,
  currentPage,
  totalPages,
  onPageChange,
}: IProps) => {
  const modalType = useAppSelector(getCurrentModalType)
  const modalValue = useAppSelector(getCurrentModalValue)

  const dispatch = useAppDispatch()
  const client = useApolloClient()

  const [deleteUpworkUser] = useMutation(DELETE_UPWORK_USER_MUTATION, {
    onCompleted: () => {
      client.refetchQueries({
        include: [UPWORK_USERS_QUERY, UPWORK_PROFILES_QUERY],
      })
      toast.success('UpworkUser deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const [updateUpworkUser, { loading, error }] = useMutation(
    UPDATE_UPWORK_USER_MUTATION,
    {
      onCompleted: () => {
        client.refetchQueries({
          include: [UPWORK_USERS_QUERY, UPWORK_PROFILES_QUERY],
        })
        toast.success('UpworkUser updated')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const handleDeleteUpworkUser = (id: number) => {
    deleteUpworkUser({
      variables: {
        id,
      },
    })
  }

  const handleUpdateUpworkUser = (
    id: number,
    email?: string,
    upworkUserId?: string,
    userName?: string,
    goLoginId?: string,
    profileIds?: number[]
  ) => {
    updateUpworkUser({
      variables: {
        id,
        input: { userName, upworkUserId, email, goLoginId, profileIds },
      },
    })
  }

  return (
    <>
      <div className="rounded-t-lg border">
        <div className="pl-5 pr-5 pt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={3} className="space-y-1.5 pb-10 text-left">
                  <h2 className="text-2xl font-semibold text-black">Users</h2>
                  <p className="text-sm text-gray-500">
                    Here you can manage all users
                  </p>
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Gologin ID</TableHead>
                <TableHead>Specialized profiles</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {user.userName} {user.upworkUserId}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.goLoginId}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.upworkProfiles?.map(
                        (pr: IProfile, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full border  px-2 py-1 text-xs font-medium"
                          >
                            {pr.title}
                          </span>
                        )
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => {
                          dispatch(saveModalValue(user))
                          dispatch(showModal(ModalsType.EDIT_UPWORK_USER))
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>

                      {modalType === ModalsType.EDIT_UPWORK_USER &&
                        modalValue && (
                          <EditUser
                            profiles={profiles}
                            user={modalValue}
                            handleUpdateUpworkUser={handleUpdateUpworkUser}
                          />
                        )}
                      <Button variant="outline" size="sm" className="px-2">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2"
                        onClick={() => {
                          dispatch(saveModalValue(user.id))
                          dispatch(showModal(ModalsType.DELETE_UPWORK_USER))
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {modalType === ModalsType.DELETE_UPWORK_USER &&
                        modalValue && (
                          <DeleteUser
                            userId={modalValue}
                            handleDeleteUpworkUser={handleDeleteUpworkUser}
                          />
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {totalPages ? (
        <PaginationCustom
          totalPages={totalPages}
          onPageChange={onPageChange}
          currentPage={currentPage}
        />
      ) : (
        <></>
      )}
    </>
  )
}
