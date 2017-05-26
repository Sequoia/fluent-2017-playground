FROM node:7

# set port
ENV PORT 80
# overrideable by passing --env FOO='abc 123' to `docker run`
ENV FOO "--------bar----------"

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# replace this with your application's default port
EXPOSE $PORT

CMD [ "sh", "-c", "npm start -- $FOO" ]