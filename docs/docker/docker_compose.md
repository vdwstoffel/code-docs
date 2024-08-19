




# Docker Compose

## Example File

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

## build options

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

## Starting Containers

Starting from the same folder as the docker-compose.yaml.
Volumes and networks will automatically be created

```bash
docker compose up           # supply services name if you do not want to run all
docker compose up -d        # run in detached mode
docker compose up --build   # rebuild the images
```

## Stopping Containers

Deletes all containers + network it created

```bash
docker compose down

# to remove volumes (do not persist data)
docker compose down -v
```

## Node Example (with nodemon)

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

## Express Backend + PostgreSQL

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

## React (Vite) + Express

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

### Backend

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

### Frontend

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

## Robot Utility Container

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
