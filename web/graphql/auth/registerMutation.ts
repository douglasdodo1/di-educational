import { gql } from '@apollo/client';

export const REGISTER_MUTATION = gql `
mutation Register($data: CreateUserInput!) {
    register(data: $data){
        access_token
        refresh_token
        user {
            id
            email
            first_name
            last_name
            bio
            avatarUrl
        }
    }
}`;
