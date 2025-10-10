# Frontend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/

# Install dependencies
RUN npm install

# Copy application code
COPY apps/frontend ./apps/frontend
COPY packages ./packages

# Build
RUN cd apps/frontend && npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace=apps/frontend"]
