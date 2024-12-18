import type {
  QueryResolvers,
  MutationResolvers,
  UpworkUserRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

const ITEMS_PER_PAGE = 5

export const upworkUsers: QueryResolvers['upworkUsers'] = async ({
  page = 1,
  pageSize = ITEMS_PER_PAGE,
}) => {
  const skip = (page - 1) * pageSize

  const [upworkUsersPerPage, totalUserItems, upworkUsers] = await Promise.all([
    db.upworkUser.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        upworkProfiles: true,
      },
    }),
    db.upworkUser.count(),
    db.upworkUser.findMany(),
  ])

  return {
    upworkUsersPerPage,
    totalUserItems,
    upworkUsers,
  }
}

export const upworkUser: QueryResolvers['upworkUser'] = ({ id }) => {
  return db.upworkUser.findUnique({
    where: { id },
  })
}

export const createUpworkUser: MutationResolvers['createUpworkUser'] = ({
  input,
}) => {
  return db.upworkUser.create({
    data: input,
  })
}

export const updateUpworkUser: MutationResolvers['updateUpworkUser'] = ({
  id,
  input,
}) => {
  const { profileIds, ...userData } = input

  const updatedUser = db.upworkUser.update({
    where: { id },
    data: {
      ...userData,
      upworkProfiles: profileIds
        ? {
            set: profileIds.map((profileId) => ({ id: profileId })),
          }
        : undefined,
    },
    include: {
      upworkProfiles: true,
    },
  })

  return updatedUser
}

export const deleteUpworkUser: MutationResolvers['deleteUpworkUser'] = ({
  id,
}) => {
  return db.upworkUser.delete({
    where: { id },
  })
}

export const UpworkUser: UpworkUserRelationResolvers = {
  upworkProfiles: (_obj, { root }) => {
    return db.upworkUser
      .findUnique({ where: { id: root?.id } })
      .upworkProfiles()
  },
}
