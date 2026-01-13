import { gql } from '@apollo/client';

// Login mutation
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

// Register mutation
export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $role: String!, $firstName: String, $lastName: String) {
    register(email: $email, password: $password, role: $role, firstName: $firstName, lastName: $lastName) {
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