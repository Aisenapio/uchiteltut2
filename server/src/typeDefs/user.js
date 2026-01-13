// src/typeDefs/user.js
const { gql } = require('graphql-tag');

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: String! # 'teacher' or 'school'
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    email: String!
    firstName: String!
    lastName: String!
    password: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = userTypeDefs;