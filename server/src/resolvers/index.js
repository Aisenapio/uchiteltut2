// src/resolvers/index.js
const User = require('../models/User');
const Job = require('../models/Job');
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

      return await Job.find(query).populate('school').populate('applicants');
    },
    
    job: async (_, { id }) => {
      return await Job.findById(id).populate('school').populate('applicants');
    },
    
    myJobs: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await Job.find({ school: user._id }).populate('school').populate('applicants');
    },
    
    myApplications: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await Job.find({ applicants: user._id }).populate('school').populate('applicants');
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
      
      return await Job.findById(job._id).populate('school').populate('applicants');
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
      ).populate('school').populate('applicants');
      
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
      
      // Check if user already applied
      if (job.applicants.includes(user._id)) {
        throw new Error('You have already applied to this job');
      }
      
      // Add user to applicants
      job.applicants.push(user._id);
      await job.save();
      
      return await Job.findById(jobId).populate('school').populate('applicants');
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
    }
  },
  
  Job: {
    school: async (parent) => {
      return await User.findById(parent.school);
    },

    applicants: async (parent) => {
      return await User.find({ _id: { $in: parent.applicants } });
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
  }
};

module.exports = resolvers;