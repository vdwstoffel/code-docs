# Docker

## Setup a dockerfile for a Node application

```dockerfile
FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
```

```json
 "scripts": {
    "dev": "vite",
  },
```

## Development Setup for React/Express (with PostGreSQL)

```terminal
├── client
│   ├── docker
│   │   └── Dockerfile
│   ├── package.json
│   ├── src
│   │   ├── ..
├── docker-compose.yaml
└── server
    ├── docker
    │   ├── Dockerfile
    ├── package.json
    ├── src
    │   ├── ...
```

```yml title="docker-compose.yaml"
services:
  client:
    image: my_frontend:dev
    build:
      context: ./client
      dockerfile: ./docker/Dockerfile
    container_name: my_frontend
    ports:
      - "3000:3000"
    volumes:
      - ./client/src:/app/src
      - /app/node_modules/
    depends_on:
      - server

  server:
    image: my_backend:dev
    build:
      context: ./server
      dockerfile: ./docker/Dockerfile
    container_name: my_backend
    ports:
      - "3001:3001"
    volumes:
      - ./server/src/:/app/src
      - /app/node_modules/
    depends_on:
      - database

  database:
    image: postgres
    container_name: mtg_app_postgres
    restart: always
    volumes:
      - data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    env_file:
      - ./server/.env

volumes:
  data:
```

## Service Container for unit tests

```dockerfile title="unit_test.dockerfile"
FROM node:22-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "test" ]
```

```yaml title="docker-compose.yaml"
services:
  server_unittest:
  image: my_server:unit_test
  build:
    context: ./server
    dockerfile: ./docker/unit_test.dockerfile
  volumes:
    - ./server/src/:/app/src
    - /app/node_modules/
```

```json title="package.json"
 "scripts": {
    "test": "jest",
  },
```

```bash
docker compose run --rm server_unittest
```
