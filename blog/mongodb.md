---
slug: MongoDB
title: MongoDB
authors:
  name: Christoff van der Walt
  title: Author
  url: https://github.com/vdwstoffel
  image_url: https://avatars.githubusercontent.com/u/86371768?s=400&v=4
tags: [linux, mongodb, database]
---

## Installing MongoDB

Read more https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/

Import the public key used by the package management system

```bash
sudo apt-get install gnupg curl
```

Issue the following command to import the MongoDB public GPG Key from https://pgp.mongodb.com/server-6.0.asc

```bash
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
--dearmor
```

Create a list file for MongoDB. Ubuntu 22.04

```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

Reload local package database

```bash
sudo apt-get update
```

Install the MongoDB packages

```bash
sudo apt-get install -y mongodb-org

echo "mongodb-org hold" | sudo dpkg --set-selections
echo "mongodb-org-database hold" | sudo dpkg --set-selections
echo "mongodb-org-server hold" | sudo dpkg --set-selections
echo "mongodb-mongosh hold" | sudo dpkg --set-selections
echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

## Using MongoDB

[MongoDB Install Docs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)

Starting mongo service

```bash
# Start MongoDB
sudo systemctl start mongod

# Verify that MongoDB has started successfully
sudo systemctl status mongod

# Stop MongoDB.
sudo systemctl stop mongod

# Restart MongoDB
sudo systemctl restart mongod
```

Using mongo

```bash
# open mondodb terminal
mongosh

# Show all databases
show dbs

# Create new database
use <database_name>
# before you can see the database you have to add a record to it

# insert
> db.user.insert({name: 'Ada Lovelace', age: 205})
```
