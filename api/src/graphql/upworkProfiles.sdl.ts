export const schema = gql`
  type UpworkProfile {
    id: Int!
    title: String!
    valueProposition: String
    interviews: [Interview]!
    upworkUsers: [UpworkUser]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UpworkProfilePagination {
    upworkProfiles: [UpworkProfile!]!
    totalProfileItems: Int!
  }

  type Query {
    upworkProfiles(page: Int, pageSize: Int): UpworkProfilePagination!
      @requireAuth
    upworkProfile(id: Int!): UpworkProfile @requireAuth
  }

  input CreateUpworkProfileInput {
    title: String!
  }

  input UpdateUpworkProfileInput {
    title: String
    valueProposition: String
  }

  type Mutation {
    createUpworkProfile(input: CreateUpworkProfileInput!): UpworkProfile!
      @requireAuth
    updateUpworkProfile(
      id: Int!
      input: UpdateUpworkProfileInput!
    ): UpworkProfile! @requireAuth
    deleteUpworkProfile(id: Int!): UpworkProfile! @requireAuth
  }
`
