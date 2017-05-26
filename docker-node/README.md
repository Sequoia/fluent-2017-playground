# Set up

This guide is from https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

## Building

```
$ docker build --tag <your username>/node-web-app .
```

## Running

```
$ docker run -p 49160:8080 --name name-the-instance -d <your username>/node-web-app
```

Check it's up
```
docker ps
CONTAINER ID        IMAGE                       COMMAND             CREATED             STATUS              PORTS                     NAMES
49d90a8bb8f6        sequoia/node-hello-docker   "npm start"         4 seconds ago       Up 3 seconds        0.0.0.0:49160->8080/tcp   hello-docker
```

Hit it from host:

```
$ curl -i localhost:49160
```

## Utility

```
## Print the output of your app:

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080

## If you need to go inside the container you can use the exec command:

# Enter the container
$ docker exec -it <container id> /bin/bash

## To test your app, get the port of your app that Docker mapped:

$ docker ps
```