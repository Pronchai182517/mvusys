# Backend Dockerfile for mvusys Node.js Express API
FROM node:18-alpine

WORKDIR /app

# Copy package manifests and install production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code and config
COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]
