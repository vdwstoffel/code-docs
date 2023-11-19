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
