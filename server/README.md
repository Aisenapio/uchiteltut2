# uchiteltut2 Server

This is the backend server for the uchiteltut2 teacher employment portal, built with Apollo Server and Mongoose.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root of the server directory with the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/uchiteltut2
JWT_SECRET=your_secret_key_here
PORT=4000
```

3. Make sure MongoDB is running on your system

4. (Optional) Seed the database with test data:
```bash
npm run seed
```

5. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

## GraphQL Endpoint

The GraphQL endpoint will be available at:
- `http://localhost:4000/graphql` (or the port specified in your .env file)

## Features

- User authentication (teachers and schools)
- Job posting and management
- Application system for teachers
- Role-based access control