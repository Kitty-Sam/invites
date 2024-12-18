export const DELETE_UPWORK_PROFILE_MUTATION = gql`
  mutation DeleteUpworkProfileMutation($id: Int!) {
    deleteUpworkProfile(id: $id) {
      id
    }
  }
`

export const UPDATE_UPWORK_PROFILE_MUTATION = gql`
  mutation UpdateUpworkProfileMutation(
    $id: Int!
    $input: UpdateUpworkProfileInput!
  ) {
    updateUpworkProfile(id: $id, input: $input) {
      id
      title
      valueProposition
      upworkUsers {
        id
        userName
        email
      }
    }
  }
`

export const CREATE_UPWORK_PROFILE_MUTATION = gql`
  mutation CreateUpworkProfileMutation($input: CreateUpworkProfileInput!) {
    createUpworkProfile(input: $input) {
      id
    }
  }
`

export const UPWORK_PROFILES_QUERY = gql`
  query FindUpworkProfiles($page: Int, $pageSize: Int) {
    upworkProfiles(page: $page, pageSize: $pageSize) {
      upworkProfilesPerPage {
        id
        title
        valueProposition
        upworkUsers {
          id
          userName
          email
        }
      }
      totalProfileItems
      upworkProfiles {
        id
        title
        valueProposition
        upworkUsers {
          id
          userName
          email
        }
      }
    }
  }
`

export const UPWORK_PROFILE_BY_ID_QUERY = gql`
  query FindUpworkProfile($id: Int!) {
    upworkProfile(id: $id) {
      id
      title
      valueProposition
      upworkUsers {
        id
        userName
        email
      }
    }
  }
`
