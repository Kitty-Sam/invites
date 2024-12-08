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

  type Query {
    invites: [Invite!]! @requireAuth
    invite(id: Int!): Invite @requireAuth
  }

  input CreateInviteInput {
    email: String!
    companyName: String!
    firstName: String!
    lastName: String
    jobTitle: String!
    inviteDuration: Int!
    message: String
    status: String!
    expiresIn: DateTime!
  }

  input UpdateInviteInput {
    id: Int!
    status: String
  }

  input ResendInviteInput {
    id: Int!
    inviteDuration: Int!
  }

  type Mutation {
    resendInvite(id: Int!, input: ResendInviteInput!): Invite! @requireAuth
    updateInvite(id: Int!, input: UpdateInviteInput!): Invite! @requireAuth
    createInvite(input: CreateInviteInput!): Invite! @requireAuth
    deleteInvite(id: Int!): Invite! @requireAuth
  }
`
