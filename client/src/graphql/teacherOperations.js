import { gql } from '@apollo/client';

// Get teacher profile
export const GET_TEACHER_PROFILE = gql`
  query GetTeacherProfile {
    teacherProfile {
      id
      firstName
      lastName
      middleName
      birthDate
      phone
      email
      education {
        id
        institution
        faculty
        year
        level
      }
      experience {
        id
        place
        position
        start
        end
      }
      about
      category
      subjects
      resumeFile
    }
  }
`;

// Update teacher profile
export const UPDATE_TEACHER_PROFILE = gql`
  mutation UpdateTeacherProfile($input: TeacherProfileInput!) {
    updateTeacherProfile(input: $input) {
      id
      firstName
      lastName
      middleName
      birthDate
      phone
      email
      education {
        id
        institution
        faculty
        year
        level
      }
      experience {
        id
        place
        position
        start
        end
      }
      about
      category
      subjects
      resumeFile
    }
  }
`;

// Get job responses for teacher
export const GET_JOB_RESPONSES = gql`
  query GetJobResponses {
    jobResponses {
      id
      jobId
      date
      status
      job {
        id
        position
        school
      }
    }
  }
`;

// Submit job response
export const SUBMIT_JOB_RESPONSE = gql`
  mutation SubmitJobResponse($jobId: ID!) {
    submitJobResponse(jobId: $jobId) {
      id
      jobId
      date
      status
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
      school {
        id
        name
        district
        phone
        email
        address
      }
      openDate
      status
    }
  }
`;