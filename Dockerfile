# Step 1: Use the official Node.js image as base
FROM node:18-alpine

# Step 2: Set working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Step 4: Copy all application source code
COPY . .

# Step 5: Expose the port the app runs on
EXPOSE 8080

# Step 6: Define the command to start the app
CMD ["npm", "start"]
