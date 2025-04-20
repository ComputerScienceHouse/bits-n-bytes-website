# Stage 1: Build the Next.js app
FROM node:23-alpine as build

# Install Python and build tools for native modules
RUN apk add --no-cache python3 make g++ linux-headers libusb-dev eudev-dev \
  && ln -sf python3 /usr/bin/python

# Set working directory
WORKDIR /app

# Copy dependency files and install
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production
FROM node:23-alpine as production

# Install runtime dependencies for python scripts (if needed)
RUN apk add --no-cache python3 libusb-dev eudev-dev \
  && ln -sf python3 /usr/bin/python

# Set working directory
WORKDIR /app

# Copy built assets and necessary files
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/scripts ./scripts

# Expose whatever port your Express app uses
EXPOSE 3000

# Start the app using your custom Express server
CMD ["node", "server.js"]
