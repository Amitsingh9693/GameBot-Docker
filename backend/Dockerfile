# Use official Node.js Alpine image for a smaller footprint
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Set environment to production
ENV NODE_ENV=production

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy the rest of the backend source code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

CMD ["node", "server.js"]
