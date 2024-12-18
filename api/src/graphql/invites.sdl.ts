export const schema = gql`
  type Invite {
    id: Int!
    email: String!
    companyName: String!
    firstName: String!
    lastName: String
    jobTitle: String!
    inviteDuration: Int!
    message: String
    status: String!
    expiresIn: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type InvitePagination {
    invites: [Invite!]!
    totalItems: Int!
  }

  input InviteFilterInput {
    status: String
    lastName: String
  }

  input CreateInviteInput {
    email: String!
    companyName: String!
    firstName: String!
    jobTitle: String!
    inviteDuration: Int!
    status: String!
    expiresIn: DateTime!
    lastName: String!
    message: String
  }

  input UpdateInviteInput {
    id: Int!
    status: String
  }

  input ResendInviteInput {
    id: Int!
    inviteDuration: Int!
  }

  type Query {
    invites(
      page: Int
      pageSize: Int
      whereCondition: InviteFilterInput
    ): InvitePagination! @requireAuth
  }

  type Mutation {
    resendInvite(id: Int!, input: ResendInviteInput!): Invite! @requireAuth
    updateInvite(id: Int!, input: UpdateInviteInput!): Invite! @requireAuth
    createInvite(input: CreateInviteInput!): Invite! @requireAuth
    deleteInvite(id: Int!): Invite! @requireAuth
  }
`
