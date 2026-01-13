const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@as-integrations/express5');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import existing schema and resolvers
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const connectDB = require('./utils/connectDB');
const { getUserIdFromToken } = require('./utils/auth');
const User = require('./models/User');
const uploadRouter = require('./utils/upload');

// Connect to MongoDB
connectDB();

async function createServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, '../../uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Apply middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Upload routes
  app.use('/upload', uploadRouter);

  // Apollo Server setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Start Apollo Server
  await server.start();

  // Apply Apollo middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
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
    })
  );

  // Serve static files from uploads directory
  app.use('/uploads', express.static(uploadsDir));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
  });

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to uchiteltut2 API' });
  });

  return { app, httpServer, server };
}

module.exports = createServer;