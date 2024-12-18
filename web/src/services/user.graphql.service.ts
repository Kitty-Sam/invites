import { TypedDocumentNode } from '@redwoodjs/web'
import type {
  CreateUpworkUserMutation,
  CreateUpworkUserMutationVariables,
  DeleteUpworkUserMutation,
  DeleteUpworkUserMutationVariables,
  EditUpworkUserById,
  UpdateUpworkUserMutationVariables,
} from 'types/graphql'

export const DELETE_UPWORK_USER_MUTATION: TypedDocumentNode<
  DeleteUpworkUserMutation,
  DeleteUpworkUserMutationVariables
> = gql`
  mutation DeleteUpworkUserMutation($id: Int!) {
    deleteUpworkUser(id: $id) {
      id
    }
  }
`

export const UPDATE_UPWORK_USER_MUTATION: TypedDocumentNode<
  EditUpworkUserById,
  UpdateUpworkUserMutationVariables
> = gql`
  mutation UpdateUpworkUserMutation($id: Int!, $input: UpdateUpworkUserInput!) {
    updateUpworkUser(id: $id, input: $input) {
      id
      email
      userName
      upworkUserId
      goLoginId
      createdAt
      updatedAt
      upworkProfiles {
        id
        title
      }
    }
  }
`

export const UPWORK_USERS_QUERY = gql`
  query FindUpworkUsers($page: Int, $pageSize: Int) {
    upworkUsers(page: $page, pageSize: $pageSize) {
      upworkUsers {
        id
        email
        userName
        upworkUserId
        goLoginId
        createdAt
        updatedAt
        upworkProfiles {
          id
          title
        }
      }
      totalUserItems
    }
  }
`

export const CREATE_UPWORK_USER_MUTATION: TypedDocumentNode<
  CreateUpworkUserMutation,
  CreateUpworkUserMutationVariables
> = gql`
  mutation CreateUpworkUserMutation($input: CreateUpworkUserInput!) {
    createUpworkUser(input: $input) {
      id
    }
  }
`
