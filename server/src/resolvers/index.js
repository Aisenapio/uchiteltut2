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
    
    users: async () => {
      return await User.find({});
    },
    
    user: async (_, { id }) => {
      return await User.findById(id);
    },
    
    // Job queries
    jobs: async () => {
      return await Job.find({}).populate('school').populate('applicants');
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
    
    updateUser: async (_, { firstName, lastName }, { user }) => {
      if (!user) throw new Error('Authentication required');
      
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { firstName, lastName },
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
    // Resolve fields for User type
  },
  
  Job: {
    school: async (parent) => {
      return await User.findById(parent.school);
    },
    
    applicants: async (parent) => {
      return await User.find({ _id: { $in: parent.applicants } });
    }
  }
};

module.exports = resolvers;