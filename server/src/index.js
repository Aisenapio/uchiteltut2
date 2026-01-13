// src/index.js
const createServer = require('./server');
const connectDB = require('./utils/connectDB');

// Connect to MongoDB
connectDB();

async function startServer() {
  const { httpServer } = await createServer();
  const port = process.env.PORT || 4000;

  await new Promise((resolve) => {
    httpServer.listen({ port }, resolve);
  });

  console.log(`🚀 Server ready at: http://localhost:${port}`);
  console.log(`   GraphQL endpoint: http://localhost:${port}/graphql`);
  console.log(`   Upload endpoint: POST http://localhost:${port}/upload`);
  console.log(`   Health check: GET http://localhost:${port}/health`);
  console.log(`   Uploads static files: http://localhost:${port}/uploads`);

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing server');
    httpServer.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});