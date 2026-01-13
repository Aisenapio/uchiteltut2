import { gql } from '@apollo/client';

// Get teacher profile
export const GET_TEACHER_PROFILE = gql`
  query GetTeacherProfile {
    me {
      id
      email
      firstName
      lastName
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

// Update teacher profile
export const UPDATE_TEACHER_PROFILE = gql`
  mutation UpdateTeacherProfile($input: TeacherProfileInput!) {
    updateTeacherProfile(input: $input) {
      id
      email
      firstName
      lastName
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

// Get job responses for teacher
export const GET_JOB_RESPONSES = gql`
  query GetJobResponses {
    myApplications {
      id
      position
      salary
      hours
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

// Submit job response
export const SUBMIT_JOB_RESPONSE = gql`
  mutation SubmitJobResponse($jobId: ID!) {
    applyToJob(jobId: $jobId) {
      id
      position
      salary
      hours
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
      applicants {
        id
        firstName
        lastName
      }
    }
  }
`;

// Get all jobs (same as for school)
export const GET_ALL_JOBS = gql`
  query GetAllJobs($filter: JobFilter) {
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