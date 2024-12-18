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
import React from 'react'
import { IProfile } from '@/interfaces/profile.interface'
import { PaginationCustom } from '@/components/shared/PaginationCustom/PaginationCustom'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentModalValue } from '@/store/selectors'
import { PageType, showPage } from '@/store/reducers/pageReducer'
import {
  ModalsType,
  saveModalValue,
  showModal,
} from '@/store/reducers/modalReducer'
import { DeleteProfile } from '@/components/UsersAndProfiles/DeleteProfile/DeleteProfile'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  DELETE_UPWORK_PROFILE_MUTATION,
  UPWORK_PROFILES_QUERY,
} from '@/services/profile.graphql.service'
import { useApolloClient } from '@apollo/client'
import { UPWORK_USERS_QUERY } from '@/services/user.graphql.service'

interface IProps {
  profiles: IProfile[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  setCurrentProfile: any
}

export const ProfilesTable = ({
  profiles,
  currentPage,
  totalPages,
  onPageChange,
  setCurrentProfile,
}: IProps) => {
  const dispatch = useAppDispatch()
  const client = useApolloClient()

  const modalType = useAppSelector(getCurrentModalType)
  const modalValue = useAppSelector(getCurrentModalValue)

  const [deleteUpworkProfile] = useMutation(DELETE_UPWORK_PROFILE_MUTATION, {
    onCompleted: () => {
      client.refetchQueries({
        include: [UPWORK_USERS_QUERY, UPWORK_PROFILES_QUERY],
      })
      toast.success('UpworkProfile deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleDeleteUpworkProfile = (id: number) => {
    deleteUpworkProfile({
      variables: {
        id,
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
                  <h2 className="text-2xl font-semibold text-black">
                    Profiles
                  </h2>
                  <p className="text-sm text-gray-500">
                    Here you can manage all profiles
                  </p>
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Users</TableHead>
                <TableHead></TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile: IProfile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.title}</TableCell>
                  <TableCell>
                    {profile.upworkUsers
                      ?.map((user) => user.userName)
                      .join(', ')}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => {
                          setCurrentProfile(profile)
                          dispatch(showPage(PageType.EDIT_UPWORK_PROFILE))
                        }}
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="px-2">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-2"
                        onClick={() => {
                          dispatch(saveModalValue(profile.id))
                          dispatch(showModal(ModalsType.DELETE_UPWORK_PROFILE))
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      {modalType === ModalsType.DELETE_UPWORK_PROFILE &&
                        modalValue && (
                          <DeleteProfile
                            profileId={modalValue}
                            handleDeleteUpworkProfile={
                              handleDeleteUpworkProfile
                            }
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
