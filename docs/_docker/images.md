---
sidebar_label: "Images"
sidebar_position: 2
---

# Images

Docker Images are the building blocks of a Docker container. They are created with the build command, and they are used to create containers.

## How to build an image

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

## How to list all images

```bash
docker images
```

## How to delete an image

```bash
docker rmi <image_name>
```

Delete all unused images:

```bash
docker image prune -a
```

## How to remove all unused images

```bash
docker image prune
```

## How to Push/Pull images to/from dockerhub

```bash
docker push <image_name>
docker pull <image_name>
```

## How to tag an image

```bash
docker tag <image_id> my-image:my-tag
```
