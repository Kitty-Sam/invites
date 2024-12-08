import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const invites: QueryResolvers['invites'] = () => {
  return db.invite.findMany()
}

export const invite: QueryResolvers['invite'] = ({ id }) => {
  return db.invite.findUnique({
    where: { id },
  })
}

export const createInvite: MutationResolvers['createInvite'] = ({ input }) => {
  return db.invite.create({
    data: input,
  })
}

export const updateInvite: MutationResolvers['updateInvite'] = ({
  id,
  input,
}) => {
  return db.invite.update({
    data: input,
    where: { id },
  })
}

export const deleteInvite: MutationResolvers['deleteInvite'] = ({ id }) => {
  return db.invite.delete({
    where: { id },
  })
}


export const resendInvite: MutationResolvers['resendInvite'] = ({ id, input }) => {
  return db.invite.update({
    where: { id },
    data: {
      status: 'active',
      expiresIn: new Date(new Date().getTime() + Number(input.inviteDuration) * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
  })
}
