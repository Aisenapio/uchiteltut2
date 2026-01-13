// src/typeDefs/job.js
const { gql } = require('graphql-tag');

const jobTypeDefs = gql`
  type Job {
    id: ID!
    title: String!
    position: String!
    description: String!
    school: User!
    requirements: [String!]!
    salary: String
    location: String!
    hours: Int
    duties: [String!]
    benefits: [String!]
    support: String
    studentEmployment: Boolean
    openDate: String!
    status: String!
    subject: String
    postedAt: String!
    deadline: String
    isActive: Boolean!
    applicants: [User!]!
    applications: [Application!]!
  }

  type Application {
    id: ID!
    teacher: User!
    job: Job!
    status: String!
    appliedAt: String!
    updatedAt: String!
    message: String
  }

  input JobInput {
    title: String!
    description: String!
    requirements: [String!]!
    salary: String
    location: String!
    deadline: String
    position: String!
    hours: Int
    duties: [String!]
    benefits: [String!]
    support: String
    studentEmployment: Boolean
    openDate: String
    status: String
    subject: String
  }

  input JobFilter {
    search: String
    subject: String
    city: String
    minHours: Int
    minSalary: Int
    support: String
  }
`;

module.exports = jobTypeDefs;