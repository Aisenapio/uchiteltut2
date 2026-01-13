// src/resolvers/index.js
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { generateToken, getUserIdFromToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // User queries
    me: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await User.findById(user._id);
    },
    currentUser: async (_, __, { user }) => {
      if (!user) return null;
      return await User.findById(user._id);
    },
    
    users: async (_, { filter }) => {
      const query = {};
      if (filter) {
        if (filter.role) {
          query.role = filter.role;
        }
        if (filter.search) {
          query.$or = [
            { firstName: { $regex: filter.search, $options: 'i' } },
            { lastName: { $regex: filter.search, $options: 'i' } },
            { email: { $regex: filter.search, $options: 'i' } }
          ];
        }
        // Filter by subject (search in teacherDetails.subjects array)
        if (filter.subject) {
          query['teacherDetails.subjects'] = { $regex: filter.subject, $options: 'i' };
        }
        // Filter by experience (teacherDetails.experience >= value)
        if (filter.experience) {
          const expValue = parseInt(filter.experience);
          if (!isNaN(expValue)) {
            query['teacherDetails.experience'] = { $gte: expValue };
          }
        }
      }
      return await User.find(query);
    },
    
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    
    // Job queries
    jobs: async (_, { filter }) => {
      const query = {};

      if (filter) {
        // Search across multiple fields
        if (filter.search) {
          query.$or = [
            { title: { $regex: filter.search, $options: 'i' } },
            { position: { $regex: filter.search, $options: 'i' } },
            { description: { $regex: filter.search, $options: 'i' } },
            { location: { $regex: filter.search, $options: 'i' } }
          ];
        }

        if (filter.subject) {
          query.subject = { $regex: filter.subject, $options: 'i' };
        }

        if (filter.city) {
          query.location = { $regex: filter.city, $options: 'i' };
        }

        if (filter.minHours) {
          query.hours = { $gte: filter.minHours };
        }

        if (filter.minSalary) {
          // Salary is stored as string, need to extract numeric value
          // For now, we'll filter by string contains - implement numeric extraction later
          query.salary = { $regex: filter.minSalary };
        }

        if (filter.support) {
          query.support = { $regex: filter.support, $options: 'i' };
        }
      }

      return await Job.find(query).populate('school');
    },
    
    job: async (_, { id }) => {
      return await Job.findById(id).populate('school');
    },
    
    myJobs: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await Job.find({ school: user._id }).populate('school');
    },
    
    myApplications: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      // Legacy query: returns Jobs that user has applied to (through Application model)
      const applications = await Application.find({ teacher: user._id }).populate('job');
      return applications.map(app => app.job);
    },

    teacherApplications: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'teacher') throw new Error('Only teachers can view their applications');
      return await Application.find({ teacher: user._id })
        .populate('teacher')
        .populate('job');
    },

    jobApplications: async (_, { jobId }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'school') throw new Error('Only schools can view job applications');

      // Verify that the job belongs to the school
      const job = await Job.findById(jobId);
      if (!job) throw new Error('Job not found');
      if (job.school.toString() !== user._id.toString()) {
        throw new Error('You can only view applications for your own jobs');
      }

      return await Application.find({ job: jobId })
        .populate('teacher')
        .populate('job');
    },

    // Support options
    supportOptions: async () => {
      // Return distinct support options from jobs
      const supports = await Job.distinct('support');
      return supports.filter(s => s && s.trim()).sort();
    }
  },

  Mutation: {
    // User mutations
    signup: async (_, { input }) => {
      const { email, firstName, lastName, password, role } = input;
      
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const user = new User({
        email,
        firstName,
        lastName,
        password,
        role
      });
      
      await user.save();
      
      // Generate token
      const token = generateToken(user);
      
      return {
        token,
        user
      };
    },
    
    login: async (_, { input }) => {
      const { email, password } = input;
      
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Check password
      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }
      
      // Generate token
      const token = generateToken(user);
      
      return {
        token,
        user
      };
    },
    
    updateUser: async (_, { input }, { user }) => {
      if (!user) throw new Error('Authentication required');

      const updateData = {};
      if (input.firstName !== undefined) updateData.firstName = input.firstName;
      if (input.lastName !== undefined) updateData.lastName = input.lastName;

      // Update schoolDetails if provided and user is a school
      if (input.schoolDetails && user.role === 'school') {
        updateData.schoolDetails = { ...user.schoolDetails, ...input.schoolDetails };
      }

      // Update teacherDetails if provided and user is a teacher
      if (input.teacherDetails && user.role === 'teacher') {
        updateData.teacherDetails = { ...user.teacherDetails, ...input.teacherDetails };
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        updateData,
        { new: true }
      );

      return updatedUser;
    },

    updateSchoolProfile: async (_, { input }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'school') throw new Error('Only schools can update school profile');

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { schoolDetails: { ...user.schoolDetails, ...input } },
        { new: true }
      );

      return updatedUser;
    },

    updateTeacherProfile: async (_, { input }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'teacher') throw new Error('Only teachers can update teacher profile');

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { teacherDetails: { ...user.teacherDetails, ...input } },
        { new: true }
      );

      return updatedUser;
    },

    // Job mutations
    createJob: async (_, { input }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'school') throw new Error('Only schools can create jobs');
      
      const job = new Job({
        ...input,
        school: user._id
      });
      
      await job.save();
      
      return await Job.findById(job._id).populate('school');
    },
    
    updateJob: async (_, { id, input }, { user }) => {
      if (!user) throw new Error('Authentication required');
      
      const job = await Job.findById(id);
      if (!job) throw new Error('Job not found');
      if (job.school.toString() !== user._id.toString()) throw new Error('Not authorized to update this job');
      
      const updatedJob = await Job.findByIdAndUpdate(
        id,
        input,
        { new: true }
      ).populate('school');
      
      return updatedJob;
    },
    
    deleteJob: async (_, { id }, { user }) => {
      if (!user) throw new Error('Authentication required');
      
      const job = await Job.findById(id);
      if (!job) throw new Error('Job not found');
      if (job.school.toString() !== user._id.toString()) throw new Error('Not authorized to delete this job');
      
      await Job.findByIdAndDelete(id);
      return true;
    },
    
    applyToJob: async (_, { jobId }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'teacher') throw new Error('Only teachers can apply to jobs');

      const job = await Job.findById(jobId);
      if (!job) throw new Error('Job not found');

      // Check if user already applied (using Application model)
      const existingApplication = await Application.findOne({
        teacher: user._id,
        job: jobId
      });

      if (existingApplication) {
        throw new Error('You have already applied to this job');
      }

      // Create new application
      const application = new Application({
        teacher: user._id,
        job: jobId,
        status: 'pending',
        message: ''
      });

      await application.save();

      // Return populated application
      return await Application.findById(application._id)
        .populate('teacher')
        .populate('job');
    },

    updateApplicationStatus: async (_, { applicationId, status }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'school') throw new Error('Only schools can update application status');

      // Validate status
      const validStatuses = ['pending', 'invited', 'rejected'];
      if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
      }

      const application = await Application.findById(applicationId)
        .populate('teacher')
        .populate('job');

      if (!application) throw new Error('Application not found');

      // Verify that the job belongs to the school
      const job = await Job.findById(application.job._id);
      if (job.school.toString() !== user._id.toString()) {
        throw new Error('You can only update applications for your own jobs');
      }

      application.status = status;
      application.updatedAt = Date.now();
      await application.save();

      return application;
    },

    addApplicationMessage: async (_, { applicationId, message }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'school') throw new Error('Only schools can add messages to applications');

      const application = await Application.findById(applicationId)
        .populate('teacher')
        .populate('job');

      if (!application) throw new Error('Application not found');

      // Verify that the job belongs to the school
      const job = await Job.findById(application.job._id);
      if (job.school.toString() !== user._id.toString()) {
        throw new Error('You can only add messages to applications for your own jobs');
      }

      application.message = message;
      application.updatedAt = Date.now();
      await application.save();

      return application;
    },

    withdrawApplication: async (_, { applicationId }, { user }) => {
      if (!user) throw new Error('Authentication required');
      if (user.role !== 'teacher') throw new Error('Only teachers can withdraw their applications');

      const application = await Application.findById(applicationId);

      if (!application) throw new Error('Application not found');

      // Verify that the application belongs to the teacher
      if (application.teacher.toString() !== user._id.toString()) {
        throw new Error('You can only withdraw your own applications');
      }

      await Application.findByIdAndDelete(applicationId);
      return true;
    }
  },
  
  User: {
    // Resolve computed fields based on role
    name: (parent) => {
      if (parent.role === 'school' && parent.schoolDetails?.name) {
        return parent.schoolDetails.name;
      }
      return `${parent.firstName} ${parent.lastName}`;
    },
    district: (parent) => {
      if (parent.role === 'school' && parent.schoolDetails?.district) {
        return parent.schoolDetails.district;
      }
      return null;
    },
    phone: (parent) => {
      if (parent.role === 'school' && parent.schoolDetails?.phone) {
        return parent.schoolDetails.phone;
      }
      return null;
    },
    address: (parent) => {
      if (parent.role === 'school' && parent.schoolDetails?.address) {
        return parent.schoolDetails.address;
      }
      return null;
    },
    teacherDetails: (parent) => {
      if (parent.role === 'teacher') {
        return parent.teacherDetails || null;
      }
      return null;
    },
    schoolDetails: (parent) => {
      if (parent.role === 'school') {
        return parent.schoolDetails || null;
      }
      return null;
    },
    // Additional fields for teacher profile display
    subjects: (parent) => {
      if (parent.role === 'teacher' && parent.teacherDetails?.subjects) {
        // Return as comma-separated string for display
        return parent.teacherDetails.subjects.join(', ');
      }
      return null;
    },
    experience: (parent) => {
      if (parent.role === 'teacher' && parent.teacherDetails?.experience) {
        return parent.teacherDetails.experience;
      }
      return 0;
    },
    education: (parent) => {
      if (parent.role === 'teacher' && parent.teacherDetails?.education) {
        // Parse education string into array of objects for compatibility
        // Assuming education is stored as a string, return as array with one object
        return [{
          id: '1',
          institution: parent.teacherDetails.education,
          faculty: '',
          level: '',
          year: ''
        }];
      }
      return [];
    },
    region: (parent) => {
      // Not stored in current model, return null
      return null;
    },
    about: (parent) => {
      // Not stored in current model, return empty string
      return '';
    }
  },
  
  Job: {
    school: async (parent) => {
      return await User.findById(parent.school);
    },

    applicants: async (parent) => {
      // Get teachers who applied through Application model
      const applications = await Application.find({ job: parent._id }).populate('teacher');
      return applications.map(app => app.teacher);
    },

    applications: async (parent) => {
      return await Application.find({ job: parent._id })
        .populate('teacher')
        .populate('job');
    },

    // Convert Date fields to ISO strings
    openDate: (parent) => {
      return parent.openDate ? parent.openDate.toISOString() : null;
    },
    postedAt: (parent) => {
      return parent.postedAt ? parent.postedAt.toISOString() : null;
    },
    deadline: (parent) => {
      return parent.deadline ? parent.deadline.toISOString() : null;
    },
    // Ensure status is string
    status: (parent) => {
      return parent.status || 'open';
    }
  },

  Application: {
    // Convert Date fields to ISO strings
    appliedAt: (parent) => {
      return parent.appliedAt ? parent.appliedAt.toISOString() : null;
    },
    updatedAt: (parent) => {
      return parent.updatedAt ? parent.updatedAt.toISOString() : null;
    }
  }
};

module.exports = resolvers;