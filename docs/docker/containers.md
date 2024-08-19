---
sidebar_label: "Containers"
sidebar_position: 3
---

# Containers

A container is a runtime instance of a Docker image. It runs a discrete process, taking up a small amount of system resources.

Container commands can either target a specific container by its ID or name

## How to list all containers

```bash
docker ps -a
```

## How to run a container

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

## Restart a container

```bash
docker restart <container_id>
```

## Stop a container

```bash
docker stop <container_id>
```

## Remove a container

```bash
docker rm <container_id>
```

```bash
docker run --rm <container_id> # remove container once stopped
```

## Container Logs

```bash
docker logs <container_id>
```

## Open a shell in a running container

```bash
docker exec -it <container_id> sh
```

## Run command in a running container

```bash
docker exec <container_id> <shell_command>
```

## Remove all stopped containers

```bash
docker container prune
```
