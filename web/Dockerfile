# Use an official Node runtime as the base image
FROM node:14.15.0-stretch

# Set several environment variables
ENV NODE_ENV production
ENV PORT 8000
ENV DOCKER_SOCKET_PATH /host/var/run/docker.sock
ENV DOCKER_CCENV_IMAGE hyperledger/fabric-ccenv:latest

# Set the working directory in the container to /app/web/src/src
WORKDIR /app/web/src/src

# Copy the current directory contents into the container at /app/web/src/src
COPY . /app/web/src/src

# Install any needed packages specified in package.json
RUN npm install

# Make the container's port 3000 available to the outside world
EXPOSE 8000

# Define the command to run your app using CMD which keeps the container running
CMD ["npm", "start"]
