# Dockerfile

## Basic Dockerfile

```dockerfile
FROM baseImage

WORKDIR /the/workdir/path

COPY from_source to_dest

RUN command                 # Runs when image is build, ex npm install, apt install, pip install

COPY from_source to_dest

EXPOSE port

VOLUME ["path/to/file"]     # add if you need anonymous volumes

CMD [ "executable" ]        # runs when container start
```

```bash
docker build -f /path/to/your/Dockerfile -t your-image-name .
```

## Variables in docker file

```dockerfile
FROM node:14-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Set environment variables
// highlight-next-line
ENV PORT=8080

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (if available).
COPY package*.json ./
RUN npm instal

# Copy local code to the container image.
COPY . .

# Expose the port the app runs on
// highlight-next-line
EXPOSE $PORT

# Run the web service on container startup.
CMD [ "npm", "start" ]
```

## Env variables via cli

```bash
docker run -d -e MONGO_INITDB_ROOT_USERNAME=stoffel -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:latest
```

## .env files via cli

```bash
docker run --env-file ./.env
```

## Arguments

```docker
ARG DEFAULT_PORT=80
ENV PORT $DEFAULT_PORT
```

```bash
# to change the port during build
docker build -t my-images:my-tag --build-arg DEFAULT_PORT=8080
```

## .dockerignore

Files/Folder to ignore

```docker
node_module/
Dockerfile
.git
.venv
```
