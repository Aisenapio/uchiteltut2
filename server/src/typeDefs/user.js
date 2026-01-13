// src/typeDefs/user.js
const { gql } = require('graphql-tag');

const userTypeDefs = gql`
  type TeacherDetails {
    education: String
    experience: Int
    subjects: [String]
    certifications: [String]
    resume: String
  }

  type SchoolDetails {
    name: String
    district: String
    address: String
    phone: String
    website: String
    description: String
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: String! # 'teacher' or 'school'
    createdAt: String!
    updatedAt: String!
    # Computed fields
    name: String
    district: String
    phone: String
    address: String
    # Detailed fields
    teacherDetails: TeacherDetails
    schoolDetails: SchoolDetails
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

  input SchoolProfileInput {
    name: String
    district: String
    address: String
    phone: String
    website: String
    description: String
  }

  input TeacherProfileInput {
    education: String
    experience: Int
    subjects: [String]
    certifications: [String]
    resume: String
  }

  input UserUpdateInput {
    firstName: String
    lastName: String
    schoolDetails: SchoolProfileInput
    teacherDetails: TeacherProfileInput
  }

  input UserFilter {
    role: String
    search: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = userTypeDefs;