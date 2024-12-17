import { TypedDocumentNode } from '@redwoodjs/web'
import type {
  CreateUpworkProfileMutation,
  CreateUpworkProfileMutationVariables,
  DeleteUpworkProfileMutation,
  DeleteUpworkProfileMutationVariables,
  DeleteUpworkUserMutation,
  DeleteUpworkUserMutationVariables,
  EditUpworkProfileById,
  EditUpworkUserById,
  UpdateUpworkProfileMutationVariables,
  UpdateUpworkUserMutationVariables,
} from 'types/graphql'

export const DELETE_UPWORK_PROFILE_MUTATION: TypedDocumentNode<
  DeleteUpworkProfileMutation,
  DeleteUpworkProfileMutationVariables
> = gql`
  mutation DeleteUpworkProfileMutation($id: Int!) {
    deleteUpworkProfile(id: $id) {
      id
    }
  }
`

export const UPDATE_UPWORK_PROFILE_MUTATION: TypedDocumentNode<
  EditUpworkProfileById,
  UpdateUpworkProfileMutationVariables
> = gql`
  mutation UpdateUpworkProfileMutation(
    $id: Int!
    $input: UpdateUpworkProfileInput!
  ) {
    updateUpworkProfile(id: $id, input: $input) {
      id
      title
      valueProposition
      createdAt
      updatedAt
    }
  }
`

export const CREATE_UPWORK_PROFILE_MUTATION: TypedDocumentNode<
  CreateUpworkProfileMutation,
  CreateUpworkProfileMutationVariables
> = gql`
  mutation CreateUpworkProfileMutation($input: CreateUpworkProfileInput!) {
    createUpworkProfile(input: $input) {
      id
    }
  }
`

export const UPWORK_PROFILES_QUERY = gql`
  query FindUpworkProfiles($page: Int, $pageSize: Int) {
    upworkProfiles(page: $page, pageSize: $pageSize) {
      upworkProfiles {
        id
        title
        valueProposition
        createdAt
        updatedAt
        upworkUsers {
          id
          userName
        }
      }
      totalProfileItems
    }
  }
`
