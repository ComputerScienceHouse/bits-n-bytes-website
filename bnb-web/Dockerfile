# Use an official Node.js runtime as the base image
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lightweight Node.js image for production
FROM node:18-alpine as production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules

# Expose port 3000 (default for Next.js)
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]