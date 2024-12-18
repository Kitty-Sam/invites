import type {
  QueryResolvers,
  MutationResolvers,
  InterviewRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const interviews: QueryResolvers['interviews'] = () => {
  return db.interview.findMany()
}

export const interview: QueryResolvers['interview'] = ({ id }) => {
  return db.interview.findUnique({
    where: { id },
  })
}

export const createInterview: MutationResolvers['createInterview'] = ({
  input,
}) => {
  return db.interview.create({
    data: input,
  })
}

export const updateInterview: MutationResolvers['updateInterview'] = ({
  id,
  input,
}) => {
  return db.interview.update({
    data: input,
    where: { id },
  })
}

export const deleteInterview: MutationResolvers['deleteInterview'] = ({
  id,
}) => {
  return db.interview.delete({
    where: { id },
  })
}

export const Interview: InterviewRelationResolvers = {
  upworkProfile: (_obj, { root }) => {
    return db.interview.findUnique({ where: { id: root?.id } }).upworkProfile()
  },
}
