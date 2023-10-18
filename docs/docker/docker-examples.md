---
sidebar_label: "Examples"
---

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

## Postgresql Example

```yaml
version: "3.8"
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
      - dailySports:/var/lib/postgresql/data
```

```plaintext code title=".env"
POSTGRES_DB="daily_sports"
POSTGRES_USER="stoffel"
POSTGRES_PASSWORD="StoffelJossie"
POSTGRES_HOST="database"
```

## Mongo Example

```yaml title="docker-compose.yaml
version: "3.8"
services:
  mongodb:
    image: "mongo"
    container_name: mongodb # set a name for container
    volumes:
      - compose_example:/data/db
    # environment:
    # - MONGODB_USERNAME=stoffel
    # - MONGODB_PASSWORD=secret
    env_file:
      - ./.env
```

```javascript title="model.js
// @mongodb represents the container name
mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/db-name?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error("FAILED TO CONNECT TO MONGODB");
      console.error(err);
    } else {
      console.log("CONNECTED TO MONGODB!!");
      app.listen(80);
    }
  }
);
```

```plaintext title=".env"
MONGODB_USERNAME='stoffel'
MONGODB_PASSWORD='secret'
```
