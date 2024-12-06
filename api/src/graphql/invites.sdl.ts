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
    email: String
    companyName: String
    firstName: String
    lastName: String
    jobTitle: String
    inviteDuration: Int
    message: String
    status: String
    expiresIn: DateTime
  }

  type Mutation {
    resendInvite(id: Int!): Invite! @requireAuth
    createInvite(input: CreateInviteInput!): Invite! @requireAuth
    updateInvite(id: Int!, input: UpdateInviteInput!): Invite! @requireAuth
    deleteInvite(id: Int!): Invite! @requireAuth
  }
`
