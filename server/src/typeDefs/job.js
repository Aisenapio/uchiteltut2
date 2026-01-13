// src/typeDefs/job.js
const { gql } = require('graphql-tag');

const jobTypeDefs = gql`
  type Job {
    id: ID!
    title: String!
    description: String!
    school: User!
    requirements: [String!]!
    salary: String
    location: String!
    postedAt: String!
    deadline: String
    isActive: Boolean!
    applicants: [User!]!
  }

  input JobInput {
    title: String!
    description: String!
    requirements: [String!]!
    salary: String
    location: String!
    deadline: String
  }
`;

module.exports = jobTypeDefs;