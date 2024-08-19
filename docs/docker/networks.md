# Networks

Docker networks provide isolated and organized communication channels between containers, enhancing security and enabling efficient data exchange within Docker environments.

## Create a network

```bash
# First create a network
docker network create my-network_name
```

## List all networks

```bash
docker network ls
```

## Remove a network

```bash
docker network rm my-network_name
```

```bash
docker network prune
```

## Connect container to network

```bash
docker run --network my-network_name my-image:my-tag
```

## Node/MongoDB example

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

## Express/React example

```json title="package.json"
"proxy": "http://container-name:<express-port>",
```

```javascript title="App.jsx"
const response = await fetch("http://localhost:<react-port>/goals");
```

## Connect to a container on your host machine

Ex .When connecting a container to a local db

```bash
docker run -d -p 3000:3000 --network="host" my-image:my-tag
```

## Remove all networks

```bash
docker network prune
```
