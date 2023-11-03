---
sidebar_label: "Linux"
sidebar_position: 9
---

# Linux

## How to check ports in use

```bash
sudo lsof -i -P -n | grep LISTEN
```