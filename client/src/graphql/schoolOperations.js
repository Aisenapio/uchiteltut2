import { gql } from '@apollo/client';

// Get all vacancies
export const GET_VACANCIES = gql`
  query GetVacancies($filter: VacancyFilter) {
    vacancies(filter: $filter) {
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

// Get my vacancies (for logged in school)
export const GET_MY_VACANCIES = gql`
  query GetMyVacancies {
    myVacancies {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      openDate
      status
    }
  }
`;

// Get vacancy by ID
export const GET_VACANCY_BY_ID = gql`
  query GetVacancyById($id: ID!) {
    vacancy(id: $id) {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      openDate
      status
    }
  }
`;

// Create vacancy mutation
export const CREATE_VACANCY = gql`
  mutation CreateVacancy($input: VacancyInput!) {
    createVacancy(input: $input) {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      openDate
      status
    }
  }
`;

// Update vacancy mutation
export const UPDATE_VACANCY = gql`
  mutation UpdateVacancy($id: ID!, $input: VacancyInput!) {
    updateVacancy(id: $id, input: $input) {
      id
      position
      salary
      hours
      duties
      benefits
      support
      studentEmployment
      openDate
      status
    }
  }
`;

// Delete vacancy mutation
export const DELETE_VACANCY = gql`
  mutation DeleteVacancy($id: ID!) {
    deleteVacancy(id: $id) {
      success
      message
    }
  }
`;

// Get school profile
export const GET_SCHOOL_PROFILE = gql`
  query GetSchoolProfile {
    schoolProfile {
      id
      name
      district
      phone
      email
      address
    }
  }
`;

// Update school profile
export const UPDATE_SCHOOL_PROFILE = gql`
  mutation UpdateSchoolProfile($input: SchoolProfileInput!) {
    updateSchoolProfile(input: $input) {
      id
      name
      district
      phone
      email
      address
    }
  }
`;

// Find teachers
export const FIND_TEACHERS = gql`
  query FindTeachers($filter: TeacherFilter) {
    teachers(filter: $filter) {
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