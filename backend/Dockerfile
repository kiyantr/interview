# backend/Dockerfile

# Use Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port for NestJS
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

# Start the application
CMD ["npm", "run", "start:dev"]
