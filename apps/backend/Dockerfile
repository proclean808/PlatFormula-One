# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies
RUN npm install

# Copy application code
COPY apps/backend ./apps/backend
COPY packages ./packages

# Build
RUN cd apps/backend && npm run build

EXPOSE 3001

CMD ["npm", "run", "start", "--workspace=apps/backend"]
