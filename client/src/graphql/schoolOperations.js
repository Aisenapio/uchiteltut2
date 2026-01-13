import { gql } from '@apollo/client';

// Get all jobs
export const GET_VACANCIES = gql`
  query GetJobs($filter: JobFilter) {
    jobs(filter: $filter) {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      location
      subject
      school {
        id
        name
        district
        phone
        address
        email
      }
      openDate
      status
    }
  }
`;

// Get my jobs (for logged in school)
export const GET_MY_VACANCIES = gql`
  query GetMyJobs {
    myJobs {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      location
      subject
      school {
        id
        name
        district
        phone
        address
        email
      }
      openDate
      status
    }
  }
`;

// Get job by ID
export const GET_VACANCY_BY_ID = gql`
  query GetJobById($id: ID!) {
    job(id: $id) {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      location
      subject
      school {
        id
        name
        district
        phone
        address
        email
      }
      openDate
      status
    }
  }
`;

// Create job mutation
export const CREATE_VACANCY = gql`
  mutation CreateJob($input: JobInput!) {
    createJob(input: $input) {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      location
      subject
      school {
        id
        name
        district
        phone
        address
        email
      }
      openDate
      status
    }
  }
`;

// Update job mutation
export const UPDATE_VACANCY = gql`
  mutation UpdateJob($id: ID!, $input: JobInput!) {
    updateJob(id: $id, input: $input) {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      location
      subject
      school {
        id
        name
        district
        phone
        address
        email
      }
      openDate
      status
    }
  }
`;

// Delete job mutation
export const DELETE_VACANCY = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id)
  }
`;

// Get school profile
export const GET_SCHOOL_PROFILE = gql`
  query GetSchoolProfile {
    me {
      id
      email
      firstName
      lastName
      role
      name
      district
      phone
      address
      schoolDetails {
        name
        district
        address
        phone
        website
        description
      }
    }
  }
`;

// Update school profile
export const UPDATE_SCHOOL_PROFILE = gql`
  mutation UpdateSchoolProfile($input: SchoolProfileInput!) {
    updateSchoolProfile(input: $input) {
      id
      email
      firstName
      lastName
      role
      name
      district
      phone
      address
      schoolDetails {
        name
        district
        address
        phone
        website
        description
      }
    }
  }
`;

// Find teachers
export const FIND_TEACHERS = gql`
  query FindTeachers($filter: UserFilter) {
    users(filter: $filter) {
      id
      firstName
      lastName
      email
      role
      teacherDetails {
        education
        experience
        subjects
        certifications
        resume
      }
    }
  }
`;

// Get support options
export const GET_SUPPORT_OPTIONS = gql`
  query GetSupportOptions {
    supportOptions
  }
`;