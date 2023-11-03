---
sidebar_label: "More Info"
sidebar_position: 3
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# More Info

## 3rd Party Middleware

### Morgan

HTTP request logger middleware for node.js

```bash
npm install morgan
```

As early as possible add

```js
app.use(morgan("dev"))
```