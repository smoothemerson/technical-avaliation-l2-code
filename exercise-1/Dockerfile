FROM node:22-slim

WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

EXPOSE 3333
CMD ["node", "dist/src/main.js"]
