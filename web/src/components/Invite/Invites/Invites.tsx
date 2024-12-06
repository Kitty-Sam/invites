import type {FindInvites,} from 'types/graphql'
import React, {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {NewInvite} from "@/components/Invite/NewInvite/NewInvite";

export const formatDate = (dateString: Date| string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export enum EStatus {
  ACTIVE = 'active',
  ACCEPTED = 'accepted',
  EXPIRED = 'expired',
  DEACTIVATED = 'deactivated',
}

const statusColors = {
  active: 'bg-blue-500 hover:bg-blue-600',
  accepted: 'bg-green-500 hover:bg-green-600',
  expired: 'bg-yellow-500 hover:bg-yellow-600',
  deactivated: 'bg-red-500 hover:bg-red-600',
};

 const Invites = ({ invites }: FindInvites) => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  return   (<>
    <div className="flex justify-end">
      <NewInvite setIsOpen={setIsOpen} isOpen={isOpen}/>
    </div>
    <div className="flex justify-between items-center">
      <div className="inline-flex items-center bg-gray-100 rounded-lg gap-1 p-1">
        {['all', EStatus.ACTIVE, EStatus.DEACTIVATED, EStatus.EXPIRED].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-3 py-1.5 text-sm transition-colors rounded-md ${
              selectedStatus === status
                ? 'bg-white text-foreground font-medium shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>

    <div className="border rounded-lg">
      <div className="pt-5 pl-5 pr-5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={3} className="text-left space-y-1.5 pb-10">
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
                        statusColors[invite.status as keyof typeof statusColors]
                      } text-white capitalize rounded-full`}
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
                          // onClick={() => handleDeactivate(invite.id)}
                        >
                          Deactivate
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleResend(invite.id)}
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
  </>)
}

export default Invites;
