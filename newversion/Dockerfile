FROM node:24-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Start the application - используем хост 0.0.0.0 для Docker
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3001"]
