// src/seeds/seedData.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');
const connectDB = require('../utils/connectDB');

require('dotenv').config();

// Connect to DB
connectDB();

// Sample data
const sampleTeachers = [
  {
    email: 'ivan.petrov@example.com',
    firstName: 'Иван',
    lastName: 'Петров',
    password: 'password123',
    role: 'teacher',
    teacherDetails: {
      education: 'Высшее образование, Московский Педагогический Университет',
      experience: 5,
      subjects: ['Математика', 'Физика'],
      certifications: ['Сертификат по преподаванию математики', 'Сертификат по физике'],
      resume: 'https://example.com/resumes/ivan_petrov.pdf'
    }
  },
  {
    email: 'maria.sidorova@example.com',
    firstName: 'Мария',
    lastName: 'Сидорова',
    password: 'password123',
    role: 'teacher',
    teacherDetails: {
      education: 'Высшее образование, Санкт-Петербургский Университет',
      experience: 3,
      subjects: ['Русский язык', 'Литература'],
      certifications: ['Сертификат по русскому языку как иностранному'],
      resume: 'https://example.com/resumes/maria_sidorova.pdf'
    }
  },
  {
    email: 'alexander.volkov@example.com',
    firstName: 'Александр',
    lastName: 'Волков',
    password: 'password123',
    role: 'teacher',
    teacherDetails: {
      education: 'Высшее образование, Новосибирский Педагогический Институт',
      experience: 8,
      subjects: ['История', 'Обществознание'],
      certifications: ['Сертификат по преподаванию истории'],
      resume: 'https://example.com/resumes/alexander_volkov.pdf'
    }
  }
];

const sampleSchools = [
  {
    email: 'admin@gymnasium1.edu.ru',
    firstName: 'Школа',
    lastName: 'Гимназия №1',
    password: 'password123',
    role: 'school',
    schoolDetails: {
      name: 'Гимназия №1',
      address: 'г. Москва, ул. Ленина, д. 15',
      phone: '+7 (495) 123-45-67',
      website: 'https://gymnasium1.edu.ru',
      description: 'Престижная гимназия с углубленным изучением математики и физики'
    }
  },
  {
    email: 'contact@lyceum21.edu.ru',
    firstName: 'Лицей',
    lastName: 'Лицей №21',
    password: 'password123',
    role: 'school',
    schoolDetails: {
      name: 'Лицей №21',
      address: 'г. Санкт-Петербург, пр. Невский, д. 100',
      phone: '+7 (812) 987-65-43',
      website: 'https://lyceum21.edu.ru',
      description: 'Лицей с уклоном в гуманитарные науки и иностранные языки'
    }
  },
  {
    email: 'info@school38.edu.ru',
    firstName: 'Школа',
    lastName: 'Школа №38',
    password: 'password123',
    role: 'school',
    schoolDetails: {
      name: 'Школа №38',
      address: 'г. Новосибирск, ул. Советская, д. 45',
      phone: '+7 (383) 111-22-33',
      website: 'https://school38.edu.ru',
      description: 'Современная школа с инновационными методами обучения'
    }
  }
];

const sampleJobs = [
  {
    title: 'Учитель математики',
    description: 'Требуется опытный учитель математики для работы в 5-11 классах. Необходимо иметь высшее педагогическое образование и опыт работы не менее 2 лет.',
    requirements: [
      'Высшее педагогическое образование',
      'Опыт работы от 2 лет',
      'Знание современных методик преподавания',
      'Наличие действующего сертификата преподавателя'
    ],
    salary: 'от 70 000 до 100 000 руб.',
    location: 'г. Москва, ул. Ленина, д. 15',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  },
  {
    title: 'Учитель русского языка и литературы',
    description: 'Открыт набор на должность учителя русского языка и литературы. Работа в 1-11 классах. График работы 5/2.',
    requirements: [
      'Высшее гуманитарное образование',
      'Опыт преподавания от 1 года',
      'Отличное знание русского языка',
      'Навыки работы с детьми разного возраста'
    ],
    salary: 'от 65 000 до 85 000 руб.',
    location: 'г. Санкт-Петербург, пр. Невский, д. 100',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000) // 25 days from now
  },
  {
    title: 'Учитель истории',
    description: 'Требуется учитель истории для работы в 5-9 классах. Школа предоставляет все необходимые условия для работы.',
    requirements: [
      'Высшее историческое или педагогическое образование',
      'Опыт работы приветствуется',
      'Знание современных образовательных стандартов',
      'Коммуникабельность и ответственность'
    ],
    salary: 'от 60 000 до 80 000 руб.',
    location: 'г. Новосибирск, ул. Советская, д. 45',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) // 20 days from now
  }
];

const seedData = async () => {
  try {
    // Clear existing data
    console.log('Removing existing data...');
    await User.deleteMany({});
    await Job.deleteMany({});
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
    // Assign jobs to schools randomly
    const jobsWithSchools = sampleJobs.map((job, index) => ({
      ...job,
      school: insertedSchools[index % insertedSchools.length]._id
    }));

    const insertedJobs = await Job.insertMany(jobsWithSchools);
    console.log(`${insertedJobs.length} jobs inserted.`);

    // Optionally, add some applications
    console.log('Adding sample applications...');
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
      
      const applicantIds = selectedTeachers.map(idx => insertedTeachers[idx]._id);
      await Job.findByIdAndUpdate(insertedJobs[i]._id, {
        $push: { applicants: { $each: applicantIds } }
      });
    }
    console.log('Sample applications added.');

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