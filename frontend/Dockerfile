# Frontend Dockerfile

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

# Expose frontend port (adjust based on your Vite config)
EXPOSE 5173

# Start the frontend application
CMD ["pnpm", "run", "dev"]
