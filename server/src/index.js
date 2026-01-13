// src/index.js
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const connectDB = require('./utils/connectDB');
const User = require('./models/User');
const { getUserIdFromToken } = require('./utils/auth');

// Connect to MongoDB
connectDB();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
    context: async ({ req }) => {
      // Extract token from headers
      const token = req?.headers?.authorization || '';
      let user = null;

      if (token) {
        const userId = getUserIdFromToken(token);
        if (userId) {
          user = await User.findById(userId);
        }
      }

      return { user };
    },
  });

  console.log(`🚀 Server ready at: ${url}`);
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});