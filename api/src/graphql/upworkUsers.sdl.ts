export const schema = gql`
  type UpworkUser {
    id: Int!
    email: String
    userName: String
    upworkUserId: String
    goLoginId: String!
    upworkProfiles: [UpworkProfile]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type UpworkUserPagination {
    upworkUsersPerPage: [UpworkUser!]!
    upworkUsers: [UpworkUser!]!
    totalUserItems: Int!
  }

  type Query {
    upworkUsers(page: Int, pageSize: Int): UpworkUserPagination! @requireAuth
    upworkUser(id: Int!): UpworkUser @requireAuth
  }

  input CreateUpworkUserInput {
    goLoginId: String!
  }

  input UpdateUpworkUserInput {
    email: String
    userName: String
    upworkUserId: String
    goLoginId: String
    profileIds: [Int!]
  }

  type Mutation {
    createUpworkUser(input: CreateUpworkUserInput!): UpworkUser! @requireAuth
    updateUpworkUser(id: Int!, input: UpdateUpworkUserInput!): UpworkUser!
      @requireAuth
    deleteUpworkUser(id: Int!): UpworkUser! @requireAuth
  }
`
