// src/typeDefs/index.js
const { gql } = require('graphql-tag');
const userTypeDefs = require('./user');
const jobTypeDefs = require('./job');

const rootTypeDefs = gql`
  type Query {
    # User queries
    me: User
    currentUser: User
    users(filter: UserFilter): [User!]!
    user(id: ID!): User

    # Job queries
    jobs(filter: JobFilter): [Job!]!
    job(id: ID!): Job
    myJobs: [Job!]! # Jobs posted by the authenticated user
    myApplications: [Job!]! # Jobs applied to by the authenticated user

    # Support options
    supportOptions: [String!]!
  }

  type Mutation {
    # User mutations
    signup(input: UserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateUser(input: UserUpdateInput!): User!
    updateSchoolProfile(input: SchoolProfileInput!): User!
    updateTeacherProfile(input: TeacherProfileInput!): User!

    # Job mutations
    createJob(input: JobInput!): Job!
    updateJob(id: ID!, input: JobInput!): Job!
    deleteJob(id: ID!): Boolean!
    applyToJob(jobId: ID!): Job!
  }
`;

module.exports = [rootTypeDefs, userTypeDefs, jobTypeDefs];