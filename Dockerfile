# Use the official Node.js image as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the frontend
RUN cd frontend && npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD [ "npm", "run", "start" ]
