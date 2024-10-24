# Backend Dockerfile

FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of your application files
COPY . .

# Expose backend port (adjust based on your app's requirements)
EXPOSE 3000

# Start the backend application
CMD ["pnpm", "start"]
