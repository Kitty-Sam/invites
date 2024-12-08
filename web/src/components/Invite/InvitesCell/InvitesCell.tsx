import type {FindInvites, FindInvitesVariables} from 'types/graphql'
import {CellFailureProps, CellSuccessProps, TypedDocumentNode, useMutation,} from '@redwoodjs/web'
import Invites from "@/components/Invite/Invites/Invites";
import {NewInvite} from "@/components/Invite/NewInvite/NewInvite";
import React, {useState} from "react";
import {EStatus} from "@/enums/invite-status.enum";


export const QUERY: TypedDocumentNode<FindInvites, FindInvitesVariables> = gql`
  query FindInvites {
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
  }
`
// Мутация для обновления статуса приглашения
const UPDATE_INVITE = gql`
  mutation UpdateInviteMutation($id: Int!, $input: UpdateInviteInput!) {
    updateInvite(id: $id, input: $input) {
      id
      status
    }
  }
`

// Мутация для повторной отправки приглашения
const RESEND_INVITE = gql`
  mutation ResendInviteMutation($id: Int!, $input: ResendInviteInput!) {
    resendInvite(id: $id, input: $input) {
      id
      inviteDuration
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rw-text-center flex justify-between items-center w-full p-4">
      <NewInvite setIsOpen={setIsOpen} isOpen={isOpen}/>
      <span className="ml-4">No invites yet</span>
    </div>
  )
}

export const Failure = ({error}: CellFailureProps<FindInvites>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
                          invites,
                        }: CellSuccessProps<FindInvites, FindInvitesVariables>) => {
  const [updateCurrentInvite, { loading: updating, error: updateError }] = useMutation(
    UPDATE_INVITE,
    {
      refetchQueries: [{ query: QUERY }],
      onCompleted: (data) => {
        console.log('Invite updated:', data)
      },
    }
  )

  const [resendCurrentInvite, { loading: resending, error: resendError }] = useMutation(
    RESEND_INVITE,
    {
      refetchQueries: [{ query: QUERY }],
      onCompleted: (data) => {
        console.log('Invite resent:', data)
      },
    }
  )

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

  return  <Invites invites={invites}
                   onUpdateInvite={handleUpdateInvite}
                   onResendInvite={handleResendInvite}/>
}
