# frontend/Dockerfile

# Use Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Expose port for React
EXPOSE 3000

# Serve the build with a simple HTTP server
CMD ["npx", "serve", "-s", "build"]
