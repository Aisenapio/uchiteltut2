import { gql } from '@apollo/client';

// Login mutation
export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        email
        role
        firstName
        lastName
      }
      token
    }
  }
`;

// Register mutation (signup)
export const REGISTER = gql`
  mutation Signup($input: UserInput!) {
    signup(input: $input) {
      user {
        id
        email
        role
        firstName
        lastName
      }
      token
    }
  }
`;

// Get current user query
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      role
      firstName
      lastName
    }
  }
`;