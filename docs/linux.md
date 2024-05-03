---
sidebar_label: "Linux"
sidebar_position: 401
---

# Linux

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