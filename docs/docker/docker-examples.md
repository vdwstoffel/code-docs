---
sidebar_label: "Examples"
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Examples

## Node Example (with nodemon)

```docker title="Dockerfile"
FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

```json title="package.json"
"scripts": {
    "start": "nodemon app.js"
  },
"devDependencies": {
    "nodemon": "^2.0.4"
  }
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

## Express Backend + PostgreSQL

```bash
docker-compose up -d --build server
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

```yaml
version: "3.18"
services:
  database:
    image: postgres
    restart: always
    container_name: database
    env_file:
      - ./.env
    ports:
      - "5432:5432"
    volumes:
      - snippets:/var/lib/postgresql/data

  server:
    container_name: server
    build:
      context: ./
      dockerfile: ./Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - ./:/app
      - /app/node_modules/
    env_file:
      - .env
    depends_on:
      - database

volumes:
  snippets:
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
