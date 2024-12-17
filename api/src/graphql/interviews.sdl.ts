export const schema = gql`
  type Interview {
    id: Int!
    content: String!
    profileId: Int!
    upworkProfile: UpworkProfile!
  }

  type Query {
    interviews: [Interview!]! @requireAuth
    interview(id: Int!): Interview @requireAuth
  }

  input CreateInterviewInput {
    content: String!
    profileId: Int!
  }

  input UpdateInterviewInput {
    content: String
    profileId: Int
  }

  type Mutation {
    createInterview(input: CreateInterviewInput!): Interview! @requireAuth
    updateInterview(id: Int!, input: UpdateInterviewInput!): Interview!
      @requireAuth
    deleteInterview(id: Int!): Interview! @requireAuth
  }
`
