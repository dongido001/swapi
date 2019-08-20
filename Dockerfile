# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12

RUN mkdir -p /home/node/app/node_modules
# Set the working directory to /api

WORKDIR /home/node/app

# copy package.json into the container at /api
COPY package*.json ./

# install dependencies
RUN npm install -g yarn && yarn install

# Copy the current directory contents into the container at /api
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 9000

# Run the app when the container launches
CMD ["yarn", "serve"]