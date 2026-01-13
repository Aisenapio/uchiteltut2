// src/seeds/seedData.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const connectDB = require('../utils/connectDB');
const mockData = require('./mock');

require('dotenv').config();

// Connect to DB
connectDB();

// Transform mock data to database schema
const { jobs: mockJobs, teachers: mockTeachers, schools: mockSchools } = mockData;

// Transform mock teachers to User schema
const sampleTeachers = mockTeachers.map((teacher, index) => {
  // Split full name into first and last name (simplified)
  const nameParts = teacher.name.split(' ');
  const firstName = nameParts[1] || 'Учитель';
  const lastName = nameParts[0] || `Teacher${index}`;

  // Convert education array to JSON string
  const educationStr = teacher.education && teacher.education.length > 0
    ? JSON.stringify(teacher.education)
    : JSON.stringify([]);

  // Convert experience array to total years (simplified)
  const totalExperience = teacher.experienceYears || Math.floor(Math.random() * 30);

  // Create teacher details
  const teacherDetails = {
    education: educationStr,
    experience: totalExperience,
    subjects: teacher.subject ? [teacher.subject] : [],
    certifications: [],
    resume: teacher.resumeFile ? `/uploads/${teacher.resumeFile}` : null
  };

  return {
    email: teacher.email || `teacher${index}@example.com`,
    firstName,
    lastName,
    password: 'password123',
    role: 'teacher',
    teacherDetails
  };
});

// Use mock schools (already in correct format)
const sampleSchools = mockSchools;

// Transform mock jobs to Job schema and map schools
const sampleJobs = mockJobs.map((job, index) => {
  // Extract numeric hours from string like "18 часов"
  const hoursMatch = job.hours ? job.hours.match(/\d+/) : null;
  const hours = hoursMatch ? parseInt(hoursMatch[0], 10) : 18;

  // Convert duties string to array
  const duties = job.duties ? [job.duties] : [];

  // Convert benefits string to array
  const benefits = job.benefits ? [job.benefits] : [];

  // Parse openDate string to Date
  const openDate = job.openDate ? new Date(job.openDate) : new Date();

  // Create deadline (30 days from open date)
  const deadline = new Date(openDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  return {
    title: job.position || `Вакансия ${index + 1}`,
    description: job.duties || `Требуется ${job.position || 'учитель'}.`,
    requirements: [
      'Высшее педагогическое образование',
      'Опыт работы от 2 лет',
      'Знание современных методик преподавания'
    ],
    salary: job.salary || 'от 50 000 руб.',
    location: job.region || 'г. Якутск',
    position: job.position || 'Учитель',
    hours: hours,
    duties: duties,
    benefits: benefits,
    support: job.support || null,
    studentEmployment: job.studentEmployment || false,
    openDate: openDate,
    status: 'open',
    subject: job.position ? job.position.replace('Учитель ', '') : null,
    postedAt: new Date(),
    deadline: deadline,
    isActive: true,
    // School ID will be assigned after schools are inserted
    school: null, // placeholder for school ObjectId
    schoolName: job.school // original school name for mapping
  };
});

const seedData = async () => {
  try {
    // Clear existing data
    console.log('Removing existing data...');
    await User.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});
    console.log('Existing data removed.');

    // Create hashed passwords for sample users
    console.log('Hashing passwords...');
    const hashedTeachers = await Promise.all(sampleTeachers.map(async (teacher) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(teacher.password, salt);
      return { ...teacher, password: hashedPassword };
    }));

    const hashedSchools = await Promise.all(sampleSchools.map(async (school) => {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(school.password, salt);
      return { ...school, password: hashedPassword };
    }));
    console.log('Passwords hashed.');

    // Insert teachers
    console.log('Inserting teachers...');
    const insertedTeachers = await User.insertMany(hashedTeachers);
    console.log(`${insertedTeachers.length} teachers inserted.`);

    // Insert schools
    console.log('Inserting schools...');
    const insertedSchools = await User.insertMany(hashedSchools);
    console.log(`${insertedSchools.length} schools inserted.`);

    // Insert jobs
    console.log('Inserting jobs...');

    // Create mapping of school name to school ID
    const schoolNameToId = {};
    insertedSchools.forEach(school => {
      if (school.schoolDetails && school.schoolDetails.name) {
        schoolNameToId[school.schoolDetails.name] = school._id;
      }
    });

    // Assign jobs to schools based on schoolName mapping
    const jobsWithSchools = sampleJobs.map((job) => {
      const { schoolName, ...jobData } = job;
      const schoolId = schoolNameToId[schoolName] ||
                      insertedSchools[Math.floor(Math.random() * insertedSchools.length)]._id;

      return {
        ...jobData,
        school: schoolId
      };
    });

    const insertedJobs = await Job.insertMany(jobsWithSchools);
    console.log(`${insertedJobs.length} jobs inserted.`);

    // Optionally, add some applications
    console.log('Adding sample applications...');
    const applications = [];
    for (let i = 0; i < insertedJobs.length; i++) {
      // Each job gets applications from 1-2 random teachers
      const numApplicants = Math.min(insertedTeachers.length, Math.floor(Math.random() * 2) + 1);
      const selectedTeachers = [];

      for (let j = 0; j < numApplicants; j++) {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * insertedTeachers.length);
        } while (selectedTeachers.includes(randomIndex));

        selectedTeachers.push(randomIndex);
      }

      // Create Application documents for each applicant
      for (const teacherIdx of selectedTeachers) {
        const application = new Application({
          teacher: insertedTeachers[teacherIdx]._id,
          job: insertedJobs[i]._id,
          status: 'pending',
          appliedAt: new Date(),
          updatedAt: new Date(),
          message: ''
        });
        applications.push(application);
      }
    }

    // Insert all applications
    if (applications.length > 0) {
      await Application.insertMany(applications);
    }
    console.log(`${applications.length} sample applications added.`);

    console.log('\nSeeding completed successfully!');
    console.log(`\nCreated ${insertedTeachers.length} teachers`);
    console.log(`Created ${insertedSchools.length} schools`);
    console.log(`Created ${insertedJobs.length} jobs`);

    // Display login credentials for testing
    console.log('\nLogin credentials for testing:');
    console.log('\nTeachers:');
    sampleTeachers.forEach(t => {
      console.log(`Email: ${t.email}, Password: password123`);
    });
    
    console.log('\nSchools:');
    sampleSchools.forEach(s => {
      console.log(`Email: ${s.email}, Password: password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();