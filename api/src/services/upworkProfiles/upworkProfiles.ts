import type {
  QueryResolvers,
  MutationResolvers,
  UpworkProfileRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

const ITEMS_PER_PAGE = 5

export const upworkProfiles: QueryResolvers['upworkProfiles'] = async ({
  page = 1,
  pageSize = ITEMS_PER_PAGE,
}) => {
  const skip = (page - 1) * pageSize

  const [upworkProfiles, totalProfileItems] = await Promise.all([
    db.upworkProfile.findMany({
      skip,
      take: pageSize,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        upworkUsers: true,
      },
    }),
    db.upworkProfile.count(),
  ])

  return {
    upworkProfiles,
    totalProfileItems,
  }
}

export const upworkProfile: QueryResolvers['upworkProfile'] = ({ id }) => {
  return db.upworkProfile.findUnique({
    where: { id },
  })
}

export const createUpworkProfile: MutationResolvers['createUpworkProfile'] = ({
  input,
}) => {
  return db.upworkProfile.create({
    data: input,
  })
}

export const updateUpworkProfile: MutationResolvers['updateUpworkProfile'] = ({
  id,
  input,
}) => {
  return db.upworkProfile.update({
    data: input,
    where: { id },
  })
}

export const deleteUpworkProfile: MutationResolvers['deleteUpworkProfile'] =
  async ({ id }) => {
    return db.upworkProfile.delete({
      where: { id },
    })
  }

export const UpworkProfile: UpworkProfileRelationResolvers = {
  interviews: (_obj, { root }) => {
    return db.upworkProfile.findUnique({ where: { id: root?.id } }).interviews()
  },
  upworkUsers: (_obj, { root }) => {
    return db.upworkProfile
      .findUnique({ where: { id: root?.id } })
      .upworkUsers()
  },
}
