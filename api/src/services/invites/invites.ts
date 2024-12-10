import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

const ITEMS_PER_PAGE = 5

export const invites: QueryResolvers['invites'] = async ({
  page = 1,
  pageSize = ITEMS_PER_PAGE,
  whereCondition = { status: 'All', lastName: '' },
}) => {
  const skip = (page - 1) * pageSize

  const statusCondition =
    whereCondition.status !== 'All' ? { status: whereCondition.status } : {}

  const nameCondition =
    whereCondition.lastName !== ''
      ? {
          lastName: { startsWith: whereCondition.lastName },
        }
      : {}

  const combinedWhereCondition = {
    ...statusCondition,
    ...nameCondition,
  }

  const [invites, totalItems] = await Promise.all([
    db.invite.findMany({
      where: combinedWhereCondition,
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    db.invite.count({
      where: combinedWhereCondition,
    }),
  ])

  return {
    invites,
    totalItems,
  }
}

export const createInvite: MutationResolvers['createInvite'] = ({ input }) => {
  return db.invite.create({
    data: { ...input, createdAt: new Date().toISOString() },
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

export const resendInvite: MutationResolvers['resendInvite'] = ({
  id,
  input,
}) => {
  return db.invite.update({
    where: { id },
    data: {
      status: 'Active',
      expiresIn: new Date(
        new Date().getTime() + input.inviteDuration * 24 * 60 * 60 * 1000
      ).toISOString(),
      createdAt: new Date().toISOString(),
    },
  })
}

export const deleteInvite: MutationResolvers['deleteInvite'] = ({ id }) => {
  return db.invite.delete({
    where: { id },
  })
}
