import React, { FC } from 'react'
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
import EditUser from '@/components/UsersAndProfiles/EditUser/EditUser'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'
import { ModalsType, showModal } from '@/store/reducers/modalReducer'

interface IProps {
  users: IUser[] | IProfile[]
  currentPage: number
  totalPages: number
  onPageChange: any
}

export const UsersTable: FC<IProps> = ({
  users,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const modalType = useAppSelector(getCurrentModalType)
  const dispatch = useAppDispatch()

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
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.goLoginId}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.specializedProfiles.map(
                        (profile: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full border  px-2 py-1 text-xs font-medium"
                          >
                            {profile}
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
                        onClick={() =>
                          dispatch(showModal(ModalsType.EDIT_UPWORK_USER))
                        }
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>

                      {modalType === ModalsType.EDIT_UPWORK_USER && (
                        <EditUser user={user} />
                      )}
                      <Button variant="outline" size="sm" className="px-2">
                        <Share className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="px-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
