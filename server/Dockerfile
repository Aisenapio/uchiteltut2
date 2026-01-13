FROM node:24-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src ./src

# Expose port
EXPOSE 4000

# Start the server
CMD ["npm", "start"]