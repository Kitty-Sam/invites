import { useState } from 'react'
import { useMutation, useQuery } from '@redwoodjs/web'
import {
  GET_INVITES_QUERY,
  RESEND_INVITE,
  UPDATE_INVITE,
} from '@/services/invite.graphql.service'
import { EStatus } from '@/enums/invite-status.enum'
import { Invites } from '@/components/Invite/Invites/Invites'

const ITEMS_PER_PAGE = 5

export const InvitesTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const { data, loading, error } = useQuery(GET_INVITES_QUERY, {
    variables: {
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
      whereCondition: { status: selectedStatus, lastName: searchQuery },
    },
  })

  const { invites = [], totalItems = 0 } = data?.invites || {}

  const [updateCurrentInvite, { loading: updating, error: updateError }] =
    useMutation(UPDATE_INVITE, {
      refetchQueries: [{ query: GET_INVITES_QUERY }],
      onCompleted: (data) => {
        console.log('Invite updated:', data)
      },
    })

  const [resendCurrentInvite, { loading: resending, error: resendError }] =
    useMutation(RESEND_INVITE, {
      refetchQueries: [{ query: GET_INVITES_QUERY }],
      onCompleted: (data) => {
        console.log('Invite resent:', data)
      },
    })

  const handleResendInvite = (id: number, inviteDuration: number) => {
    resendCurrentInvite({
      variables: {
        id,
        input: {
          id,
          inviteDuration,
        },
      },
    })
  }

  const handleUpdateInvite = (id: number) => {
    updateCurrentInvite({
      variables: {
        id,
        input: { id, status: EStatus.DEACTIVATED },
      },
    })
  }

  return (
    <Invites
      invites={invites}
      totalItems={totalItems}
      onUpdateInvite={handleUpdateInvite}
      onResendInvite={handleResendInvite}
      setSelectedStatus={setSelectedStatus}
      selectedStatus={selectedStatus}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  )
}
