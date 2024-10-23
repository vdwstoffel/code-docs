---
sidebar_label: "Linux"
sidebar_position: 401
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Linux

## Making API Requests with Curl

```mdx-code-block
<Tabs>
<TabItem value="GET">
```

```bash
curl http://localhost:8080/api/v1/users
```

```mdx-code-block
</TabItem>
<TabItem value="POST">
```

```bash
curl -X POST http://localhost:8080/api/v1/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "email.com"}'
```

```mdx-code-block
</TabItem>
<TabItem value="PUT">
```

```bash
curl -X PUT http://localhost:8080/api/v1/users/1 -H "Content-Type: application/json" -d '{"name": "Jane Doe", "email": "email.com"}'
```

```mdx-code-block
</TabItem>
<TabItem value="DELETE">
```

```bash
curl -X DELETE http://localhost:8080/api/v1/users/1
```

```mdx-code-block
</TabItem>
</Tabs>
```



## How to check ports in use

```bash
sudo lsof -i -P -n | grep LISTEN
```

## System

### Check Status

```bash
systemctl status mongod.service
```

### Start Service

```bash
systemctl start mongod.service
```

### Stop Service

```bash
systemctl stop mongod.service
```

### Restart Service

```bash
systemctl restart mongod.service
```

## Networking

### Connect to a Wifi network

First, list the available WiFi networks:

```bash
nmcli device wifi list
```

Connect to the WiFi network using the following command:

```bash
nmcli device wifi connect SSID_NAME password PASSWORD
```

Replace SSID_NAME with the name of the WiFi network you want to connect to and PASSWORD with the password for that network.

## Applications

### Install a .deb package

```bash
sudo dpkg -i package_name.deb
```