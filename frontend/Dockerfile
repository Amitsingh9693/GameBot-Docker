# Stage 1: Build the React app using Vite
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies (including devDependencies for build)
COPY package*.json ./
RUN npm ci

# Copy source files and build
COPY . .
RUN npm run build

# Stage 2: Serve the app using Node.js static server
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install 'serve' package globally to serve static files
RUN npm install -g serve

# Copy the built assets from the build stage
COPY --from=build /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Start the static server
CMD ["serve", "-s", "dist", "-l", "3000"]
