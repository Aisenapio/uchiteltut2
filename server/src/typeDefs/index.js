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
    myApplications: [Job!]! # Jobs applied to by the authenticated user (legacy)

    # Application queries
    teacherApplications: [Application!]! # Applications submitted by the authenticated teacher
    jobApplications(jobId: ID!): [Application!]! # Applications for a specific job (school access)

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
    applyToJob(jobId: ID!): Application! # Now returns Application instead of Job

    # Application mutations
    updateApplicationStatus(applicationId: ID!, status: String!): Application!
    addApplicationMessage(applicationId: ID!, message: String!): Application!
    withdrawApplication(applicationId: ID!): Boolean!
  }
`;

module.exports = [rootTypeDefs, userTypeDefs, jobTypeDefs];