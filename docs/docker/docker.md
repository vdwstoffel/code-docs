---
sidebar_label: "Docker"
sidebar_position: 400
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import dockerLogo from "@site/static/img/docker.png"
import DisplayLogo from "@site/src/components/DisplayLogo"

# Docker

<DisplayLogo logo={dockerLogo} />

Docker is a platform for developing, shipping, and running applications in containers. Containers allow a developer to package up an application with all parts it needs, such as libraries and other dependencies, and ship it all out as one package.

[Official Documentation](https://docs.docker.com/)

## Images

Docker Images are the building blocks of a Docker container. They are created with the build command, and they are used to create containers.

### How to build an image

In the same root folder as the dockerfile

```bash
docker build -t my-image:my-tag .
```

or specify path to the Dockerfile

```bash
docker build -f path/to/Dockerfile -t my-image:my-tag .
```

<details>
<summary>Example</summary>

```bash title="Terminal"
docker build -t app:v1 .
```

```bash title="Terminal"
docker images

REPOSITORY    TAG                IMAGE ID       CREATED        SIZE
app           v1                 0e2ae3b450ff   2 hours ago    700MB
```

</details>

### How to list all images

```bash
docker images
```

### How to delete an image

```bash
docker rmi <image_name>
```

Delete all unused images:

```bash
docker image prune -a
```

### How to remove all unused images

```bash
docker image prune
```

### How to Push/Pull images to/from dockerhub

```bash
docker push <image_name>
docker pull <image_name>
```

### How to tag an image

```bash
docker tag <image_id> my-image:my-tag
```

## Containers

A container is a runtime instance of a Docker image. It runs a discrete process, taking up a small amount of system resources.

Container commands can either target a specific container by its ID or name

### How to list all containers

```bash
docker ps -a
```

### How to run a container

Run a container in the background (detached mode) `-d`

```bash
docker run -d my-image:my-tag
```

- **How to expose container ports**

`3000:8000` 3000 refers to the host port and 8000 refers to the container port.

```bash
docker run -d -p 3000:8000 my-image:my-tag
```

- **How to add name to a container**

```bash
docker run -d --name my-container my-image:my-tag
```

- **How to automatically remove a container once stopped**

```bash
docker run --rm my-image:my-tag
```

### Restart a container

```bash
docker restart <container_id>
```

### Stop a container

```bash
docker stop <container_id>
```

### Remove a container

```bash
docker rm <container_id>
```

```bash
docker run --rm <container_id> # remove container once stopped
```

### Container Logs

```bash
docker logs <container_id>
```

### Open a shell in a running container

```bash
docker exec -it <container_id> sh
```

### Run command in a running container

```bash
docker exec <container_id> <shell_command>
```

### Remove all stopped containers

```bash
docker container prune
```

## Volumes

### List all volumes

```bash
docker volume ls
```

### Remove a volume

```bash
docker volume rm <volume_name>
```

```bash
docker volume prune
```

### Named Volumes

Named volumes in Docker are a way to persist data generated by and used by Docker containers.
In this command, `volume_name` is the name of the volume and `/app/data` is the path in the container where the volume is mounted. If volume_name does not exist, Docker will create it.

```bash
docker run -v volume_name:/app/data my-docker-image
```

### Anonymous Volumes

They are used for data that persists while the container is running, but doesn't need to be kept after the container is removed.
In this command, `/app/data` is the path in the container where the anonymous volume is mounted. When the container is removed, the anonymous volume is also removed.

```bash
docker run -v /app/data my-image my-docker-image
```

### Bind Mounts

A bind mount in Docker is a method of attaching a specific directory or file from your host machine's filesystem directly into a Docker container. This allows the container to access and modify the files and directories on the host system as if they were part of the container's own filesystem. In this command, `/host/path` is the path on the host machine and `/container/path` is the path in the container where the host's directory is

```bash
docker run -v /path/on/host:/path/in/container my-docker-image
```

### Remove all volumes

```bash
docker volume prune
```

## Networks

Docker networks provide isolated and organized communication channels between containers, enhancing security and enabling efficient data exchange within Docker environments.

### Create a network

```bash
# First create a network
docker network create my-network_name
```

### List all networks

```bash
docker network ls
```

### Remove a network

```bash
docker network rm my-network_name
```

```bash
docker network prune
```

### Connect container to network

```bash
docker run --network my-network_name my-image:my-tag
```

### Node/MongoDB example

```javascript
// connect to mongo using the container name
const mongo = "mongodb://my-app-mongo:27017/dbName";
```

```bash
# run mongo container. Name should match the connection in the node app
docker run -d --name my-app-mongo --network node-mongo-example mongo:latest

# run node app
docker run -d -p 3000:3000 --network node-mongo-example my-image:my-tag
```

### Express/React example

```json title="package.json"
"proxy": "http://container-name:<express-port>",
```

```javascript title="App.jsx"
const response = await fetch("http://localhost:<react-port>/goals");
```

### Connect to a container on your host machine

Ex .When connecting a container to a local db

```bash
docker run -d -p 3000:3000 --network="host" my-image:my-tag
```

### Remove all networks

```bash
docker network prune
```

## Dockerfile

### Basic Dockerfile

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

### Variables in docker file

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

### Env variables via cli

```bash
docker run -d -e MONGO_INITDB_ROOT_USERNAME=stoffel -e MONGO_INITDB_ROOT_PASSWORD=secret mongo:latest
```

### .env files via cli

```bash
docker run --env-file ./.env
```

### Arguments

```docker
ARG DEFAULT_PORT=80
ENV PORT $DEFAULT_PORT
```

```bash
# to change the port during build
docker build -t my-images:my-tag --build-arg DEFAULT_PORT=8080
```

### .dockerignore

Files/Folder to ignore

```docker
node_module/
Dockerfile
.git
.venv
```

## Docker Compose

### Example File

```txt
├── backend
│   ├── ...files
├── frontend
│   ├── ...files
├── docker-compose.yaml
```

```yaml title+"docker-compose.yaml"
version: "version" # docker-compose specification
services:
  # name your services
  service-name:
    image: imageName:tag # name of image (own name or use existing images ex mongo, node)
    build: path # when building your own Dockerfile
    container_name: name # give custom name to service
    ports:
      - "<host_port>:<container_port>"
    volumes:
      # named volumes
      - volume_name:/path/
      # relative path for bind mounts
      - ./backend:/app
      # anon volumes
      - /app/node_modules
    environment:
      - name=value # env variables
    env_file:
      - ./path/to/filename
    depends_on:
      - serviceName # other services (containers) it depends on

    # using interactive mode
    stdin_open: true
    tty: true

  # second-service:
  #   ...

volumes:
  # Top level volumes where you add your named volumes
  volume_name:
```

### build options

For Dockerfiles in nested folders, the build can be specified

```yaml
build:
  context: . #  specifies the build context as the root folder of your project.
  dockerfile: docker/Dockerfile # points to the Dockerfile in the "docker" folder.
```

Note that the copy should end with a `/` to specify a folder in the docker/Dockerfile

```docker
COPY package*.json ./
```

### Starting Containers

Starting from the same folder as the docker-compose.yaml.
Volumes and networks will automatically be created

```bash
docker compose up           # supply services name if you do not want to run all
docker compose up -d        # run in detached mode
docker compose up --build   # rebuild the images
```

### Stopping Containers

Deletes all containers + network it created

```bash
docker compose down

# to remove volumes (do not persist data)
docker compose down -v
```

### Node Example (with nodemon)

```mdx-code-block
<Tabs>
<TabItem value="Dockerfile">
```

```dockerfile title="Dockerfile"
FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```mdx-code-block
</TabItem>
<TabItem value="docker-compose.yaml">
```

```yaml title="docker-compose.yaml"
version: "3.8"
services:
  server:
    container_name: server
    build:
    context: ./server
    dockerfile: ./docker/Dockerfile
    ports:
      - "3001:3001"
    volumes:
      - ./server:/app
      - /app/node_modules/
    env_file:
      - .env
    depends_on:
      - database
```

```mdx-code-block
</TabItem>
<TabItem value="package.json">
```

```json title="package.json"
"scripts": {
    "start": "nodemon app.js"
  },
"devDependencies": {
    "nodemon": "^2.0.4"
  }
```

```mdx-code-block
</TabItem>
</Tabs>
```

```bash
docker compose up -d --build server
```

### Express Backend + PostgreSQL

```bash
docker compose up -d --build server
```

```mdx-code-block
<Tabs>
<TabItem value="Database.js">
```

```js
"use strict";

const { Client } = require("pg");
require("dotenv").config({ path: "./.env" });

class Connector {
  constructor() {
    (this.database = process.env.POSTGRES_DB),
      (this.host = process.env.POSTGRES_HOST),
      (this.user = process.env.POSTGRES_USER),
      (this.password = process.env.POSTGRES_PASSWORD);
  }

  connectToDatabase = () => {
    const client = new Client({
      host: this.host,
      port: 5432,
      database: this.database,
      user: this.user,
      password: this.password,
      idle_in_transaction_session_timeout: 3,
    });
    return client;
  };
}

class User extends Connector {
  createTable = async () => {
    const client = this.connectToDatabase();
    await client.connect();
    await client.query(`CREATE TABLE IF NOT EXISTS users_table (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(250)
        );`);
    await client.end();
  };

  getUsers = async () => {
    const client = this.connectToDatabase();
    await client.connect();
    const query = await client.query(`SELECT * FROM users_table;`);
    await client.end();
    return query.rows;
  };

  insertUser = async (username) => {
    const client = this.connectToDatabase();
    await client.connect();
    await client.query(`INSERT INTO users_table (username)
                          VALUES ('${username}');`);
    await client.end();
  };
}

module.exports = User;
```

```mdx-code-block
</TabItem>
<TabItem value="App.js">
```

```js
const express = require("express");
const app = express();

const Database = require("./db");
const db = new Database();
db.createTable();

app.get("/", async (req, res) => {
  const users = await db.getUsers();
  res.send(users);
});

app.post("/add", async (req, res) => {
  await db.insertUser("stoffel");
  const users = await db.getUsers();
  res.send(users);
});

app.listen(3000);
```

```mdx-code-block
</TabItem>
<TabItem value=".env">
```

```env
POSTGRES_DB="snippets"
POSTGRES_USER="myUsername"
POSTGRES_PASSWORD="SecretPassword"
POSTGRES_HOST="database"    # should match the service in docker-compose
```

```mdx-code-block
</TabItem>
<TabItem value="Dockerfile">
```

```docker
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
```

```mdx-code-block
</TabItem>
<TabItem value="docker-compose.yaml">
```

```yml
version: "3.8"
services:
  database:
    image: postgres
    container_name: website_database
    restart: always
    env_file:
      - ./server/.env
    ports:
      - "5432:5432"
    volumes:
      - userDB:/var/lib/postgresql/data

  server:
    container_name: website_server
    restart: unless-stopped
    build:
      context: ./server
      dockerfile: docker/Dockerfile
    ports:
      - "3001:3001"
    volumes:
      - /app/node_modules
      - ./server:/app
    env_file:
      - ./server/.env
    depends_on:
      - database

volumes:
  userDB:
```

```mdx-code-block
</TabItem>
</Tabs>
```

### React (Vite) + Express

```
├── client
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
├── docker-compose.yaml
└── server
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    └── server.js
```

```yaml title="docker-compose.yaml"
version: "3.18"
services:
  server:
    image: server:exammple
    container_name: server
    build:
      context: ./server
      dockerfile: ./Dockerfile
    ports:
      - "3001:3001"
    volumes:
      - ./server:/app
      - /app/node_modules/

  client:
    image: client:example
    container_name: client
    build:
      context: ./client
      dockerfile: ./Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./client/src:/app/src
      - /app/node_modules/
    depends_on:
      - server
```

#### Backend

```mdx-code-block
<Tabs>
<TabItem value="server.js">
```

```js
"use strict";

const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.send("hello world");
});

app.listen(3001);
```

```mdx-code-block
</TabItem>
<TabItem value="Dockerfile">
```

```docker
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 3001

CMD [ "node", "server.js" ]
```

```mdx-code-block
</TabItem>
</Tabs>
```

#### Frontend

```mdx-code-block
<Tabs>
<TabItem value="vite.config.js">
```

```js
 server: {
    port: 3000, // set custom port:
    host: true, // needed for docker
    proxy: {
      "/api": {
        target: "http://server:3001", // docker-compose service name: express port
        changeOrigin: true,
      },
    },
  },
```

```mdx-code-block
</TabItem>
<TabItem value="App.jsx">
```

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [img, setImg] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api"); // path from server
      setImg(res.data);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Response: {img}</h1>
    </div>
  );
}
```

```mdx-code-block
</TabItem>
<TabItem value="Dockerfile">
```

```docker
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Utility Containers

A utility container is a Docker container that is specifically designed to perform a single task or provide a specialized service to other containers.

```docker title="Dockerfile"
FROM node:18-alpine

WORKDIR /app

ENTRYPOINT [ "npm" ]    # initial arg to be run, other command will be appened
```

```yaml title="docker-compose.yaml"
version: "3.18"
services:
  # app services here
  # ...

  npm-test: # service name to be run in cli
    build: /path/to/dockerfile
    stdin_open: true # if applicable
    tty: true # if applicable
    volumes:
      - ./:/app
```

Then in the terminal run the chosen service

```bash
# docker-compose run --rm service_name arguments
docker compose run --rm npm-test init    # runs npm init
docker compose run --rm npm-test install # runs npm install
```

If you have other app containers in the docker-compose.yaml and don`t want to run the utility containers. Add depends_on to the service

```yaml
services:
  frontend:
    image: "node"
    depends_on:
      - backend
      - database
```

Then in the command line run

```bash
docker compose up -d frontend
```

This will launch all the dependent services

### Robot Utility Container

```
├── robot
│   ├── docker
│     ├── Dockerfile
├── server
│   ├── docker
│     ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
```

```yaml
version: "3.8"
services:
  server:
    container_name: my_backend_server
    restart: unless-stopped
    build:
      context: ./server
      dockerfile: docker/Dockerfile
    ports:
      - "3001:3001"
    volumes:
      - /app/node_modules
      - ./server:/app
    env_file:
      - ./server/.env

  ## Utility container for running robot tests
  ## docker-compose run --rm robot robot ./robot/tests
  robot:
    container_name: robot_tests
    build:
      context: .
      dockerfile: ./robot/docker/Dockerfile
    volumes:
      - ./:/app/
    depends_on:
      - server
```

```dockerfile title="docker/Dockerfile"
FROM python:3

WORKDIR /app

COPY ./robot/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . ./
```
