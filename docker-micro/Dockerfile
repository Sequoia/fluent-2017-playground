FROM node:7

ENV NODE_ENV production
ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# If build step is needed:
# RUN npm build

# Bundle app source
COPY . /usr/src/app

EXPOSE $PORT

CMD [ "npm", "start" ]