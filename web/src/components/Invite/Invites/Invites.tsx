import React, { FC, useState, useTransition } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EStatus } from '@/enums/invite-status.enum'
import { formatDate } from '@/helpers/date/formatDate'
import { IInvite } from 'src/interfaces/invite.interface'

import { NewInvite } from '@/components/Invite/NewInvite/NewInvite'
import PaginationCustom from '@/components/shared/PaginationCustom/PaginationCustom'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { TabNavigationCustom } from '@/components/shared/TabNavigationCustom/TabNavigationCustom'

export const ITEMS_PER_PAGE = 5

const statusColors = {
  Active: 'bg-blue-500 hover:bg-blue-600',
  Accepted: 'bg-green-500 hover:bg-green-600',
  Expired: 'bg-yellow-500 hover:bg-yellow-600',
  Deactivated: 'bg-red-500 hover:bg-red-600',
}

export interface IProps {
  onUpdateInvite: (id: number) => void
  onResendInvite: (id: number, inviteDuration: number) => void
  setSelectedStatus: (status: string) => void
  selectedStatus: string
  searchQuery: string
  setSearchQuery: (value: string) => void
  setCurrentPage: any
  currentPage: number
  invites: IInvite[]
  totalItems: number
}

const Invites: FC<IProps> = ({
  invites,
  onResendInvite,
  onUpdateInvite,
  setSelectedStatus,
  selectedStatus,
  setCurrentPage,
  currentPage,
  searchQuery,
  setSearchQuery,
  totalItems,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [_, startTransition] = useTransition()

  const totalPages = totalItems ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 1

  const handleDeactivate = (id: number) => {
    onUpdateInvite(id)
  }

  const handleResend = async (id: number, duration: number) => {
    onResendInvite(id, duration)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    startTransition(() => {
      setSearchQuery(value)
    })
  }

  return (
    <>
      <div className="flex items-start justify-end gap-2">
        <div className="relative">
          <InputCustom
            label=""
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-[200px] pl-8 pr-8"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <TabNavigationCustom
          tabs={['All', EStatus.ACTIVE, EStatus.DEACTIVATED, EStatus.EXPIRED]}
          activeTab={selectedStatus}
          onTabChange={(tab) => {
            setSelectedStatus(tab)
          }}
        />
        <NewInvite setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>

      <div className="rounded-lg border">
        <div className="pl-5 pr-5 pt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={3} className="space-y-1.5 pb-10 text-left">
                  <h2 className="text-2xl font-semibold">Invites</h2>
                  <p className="text-sm text-gray-500">Manage your invites</p>
                </TableHead>
              </TableRow>
              <TableRow>
                <TableHead className="text-gray-500">Name</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-gray-500">Created at</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invites &&
                invites.map((invite) => (
                  <TableRow key={invite.id} className="h-20">
                    <TableCell>
                      {invite.lastName} {invite.firstName} {invite.companyName}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`${
                          statusColors[
                            invite.status as keyof typeof statusColors
                          ]
                        } rounded-full capitalize text-white`}
                      >
                        {invite.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(invite.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {invite.status !== EStatus.DEACTIVATED && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDeactivate(invite.id)}
                          >
                            Deactivate
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleResend(invite.id, invite.inviteDuration)
                          }
                        >
                          Resend
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
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <></>
      )}
    </>
  )
}

export default Invites
