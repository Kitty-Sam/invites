import { useMutation, useQuery } from '@redwoodjs/web'
import React, { useState } from 'react'
import { EStatus } from '@/enums/invite-status.enum'
import Invites, { ITEMS_PER_PAGE } from '@/components/Invite/Invites/Invites'
import { NewInvite } from '@/components/Invite/NewInvite/NewInvite'

// Запрос на получение данных по странице
export const QUERY = gql`
  query FindInvites(
    $page: Int
    $pageSize: Int
    $whereCondition: InviteFilterInput
  ) {
    invites(page: $page, pageSize: $pageSize, whereCondition: $whereCondition) {
      invites {
        id
        email
        companyName
        firstName
        lastName
        jobTitle
        inviteDuration
        message
        status
        expiresIn
        createdAt
        updatedAt
      }
      totalItems
    }
  }
`

// Мутация для обновления статуса приглашения
const UPDATE_INVITE = gql`
  mutation UpdateInviteMutation($id: Int!, $input: UpdateInviteInput!) {
    updateInvite(id: $id, input: $input) {
      id
    }
  }
`

// Мутация для повторной отправки приглашения
const RESEND_INVITE = gql`
  mutation ResendInviteMutation($id: Int!, $input: ResendInviteInput!) {
    resendInvite(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="rw-text-center flex w-full items-center justify-between p-4">
      <NewInvite setIsOpen={setIsOpen} isOpen={isOpen} />
      <span className="ml-4">No invites yet</span>
    </div>
  )
}

export const Failure = () => <div className="rw-cell-error">error</div>

export const Success = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data, loading, error } = useQuery(QUERY, {
    variables: {
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
      whereCondition: { status: selectedStatus, lastName: searchQuery },
    },
  })

  const { invites = [], totalItems = 0 } = data?.invites || {}

  const [updateCurrentInvite, { loading: updating, error: updateError }] =
    useMutation(UPDATE_INVITE, {
      refetchQueries: [{ query: QUERY }],
      onCompleted: (data) => {
        console.log('Invite updated:', data)
      },
    })

  const [resendCurrentInvite, { loading: resending, error: resendError }] =
    useMutation(RESEND_INVITE, {
      refetchQueries: [{ query: QUERY }],
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
