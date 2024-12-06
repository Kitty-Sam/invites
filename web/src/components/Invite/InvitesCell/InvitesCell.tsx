import type {FindInvites, FindInvitesVariables} from 'types/graphql'
import type {CellFailureProps, CellSuccessProps, TypedDocumentNode,} from '@redwoodjs/web'
import Invites from "@/components/Invite/Invites/Invites";
import {NewInvite} from "@/components/Invite/NewInvite/NewInvite";
import React, {useState} from "react";



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
  return  <Invites invites={invites}/>
}
