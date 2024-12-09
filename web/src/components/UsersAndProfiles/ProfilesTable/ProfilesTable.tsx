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
import React, { FC } from 'react'
import { IProfile } from '@/interfaces/profile.interface'
import PaginationCustom from '@/components/shared/PaginationCustom/PaginationCustom'
import { IUser } from '@/interfaces/user.interface'

interface IProps {
  profiles: IProfile[] | IUser[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const ProfilesTable: FC<IProps> = ({
  profiles,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <>
      <div className="rounded-lg border">
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
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>{profile.name}</TableCell>
                  <TableCell>{profile.users.join(', ')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
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
