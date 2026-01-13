// src/typeDefs/index.js
const { gql } = require('graphql-tag');
const userTypeDefs = require('./user');
const jobTypeDefs = require('./job');

const rootTypeDefs = gql`
  type Query {
    # User queries
    me: User
    users: [User!]!
    user(id: ID!): User
    
    # Job queries
    jobs: [Job!]!
    job(id: ID!): Job
    myJobs: [Job!]! # Jobs posted by the authenticated user
    myApplications: [Job!]! # Jobs applied to by the authenticated user
  }

  type Mutation {
    # User mutations
    signup(input: UserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    updateUser(firstName: String, lastName: String): User!
    
    # Job mutations
    createJob(input: JobInput!): Job!
    updateJob(id: ID!, input: JobInput!): Job!
    deleteJob(id: ID!): Boolean!
    applyToJob(jobId: ID!): Job!
  }
`;

module.exports = [rootTypeDefs, userTypeDefs, jobTypeDefs];