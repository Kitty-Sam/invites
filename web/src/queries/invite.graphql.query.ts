export const GET_INVITES_QUERY = gql`
  query FindInvites(
    $page: Int
    $pageSize: Int
    $whereCondition: InviteFilterInput
  ) {
    invites(page: $page, pageSize: $pageSize, whereCondition: $whereCondition) {
      invites {
        id
        email
        companyName
        firstName
        lastName
        jobTitle
        inviteDuration
        message
        status
        expiresIn
        createdAt
        updatedAt
      }
      totalItems
    }
  }
`

export const UPDATE_INVITE = gql`
  mutation UpdateInviteMutation($id: Int!, $input: UpdateInviteInput!) {
    updateInvite(id: $id, input: $input) {
      id
    }
  }
`

export const RESEND_INVITE = gql`
  mutation ResendInviteMutation($id: Int!, $input: ResendInviteInput!) {
    resendInvite(id: $id, input: $input) {
      id
    }
  }
`
