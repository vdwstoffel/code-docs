---
sidebar_label: "Authentication"
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Authentication

## Authenticatiing user with a json web token

```bash
npm install jsonwebtoken
npm install @types/jsonwebtoken --save-dev
```

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

```ts title="jwt.js"
const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET = "superSecret"; // Secret should be at least 32 characters

export function createToken(id) {
  return sign({ userId: id }, JWT_SECRET, { expiresIn: "1w" });
}

export function verifyToken(token) {
  return verify(token, JWT_SECRET);
}
```

```ts title="index.js"
const express = require("express");

const { createToken, verifyToken } = require("./jwt");

const app = express();
app.use(express.json());

app.get("/getToken", (req, res) => {
  const token = createToken(597);
  res.status(200).json({ status: "success", token: token });
});

app.post("/login", (req, res) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ status: "fail", message: "Token not provided" });
  }

  try {
    const result = verifyToken(token); // { userId: 597, iat: 1721031831, exp: 1721636631 }
    res.status(200).json({ status: "success", message: "logged in" });
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
});

app.listen(3000);
```

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

[See Code](https://github.com/vdwstoffel/code-docs/tree/main/examples/javascript/express/authjwt_with_ts)

```ts title="jwt.ts"
import { JwtPayload, sign, verify } from "jsonwebtoken";

const JWT_SECRET = "superSecret"; // Secret should be at least 32 characters

export function createToken(id: number): string {
  return sign({ userId: id }, JWT_SECRET, { expiresIn: "1w" });
}

export function verifyToken(token: string): string | JwtPayload {
  return verify(token, JWT_SECRET);
}
```

```ts title="index.ts"
import express, { Application, Request, Response } from "express";

import { createToken, verifyToken } from "./jwt";

const app: Application = express();
app.use(express.json());

app.get("/getToken", (req: Request, res: Response) => {
  const token = createToken(597);
  res.status(200).json({ status: "success", token: token });
});

app.post("/login", (req: Request, res: Response) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ status: "fail", message: "Token not provided" });
  }

  try {
    const result = verifyToken(token); // { userId: 597, iat: 1721031831, exp: 1721636631 }
    res.status(200).json({ status: "success", message: "logged in" });
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
});

app.listen(3000);
```

```mdx-code-block
</TabItem>
</Tabs>
```

```bash
curl http://localhost:3000/getToken
# {"status":"success","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU5NywiaWF0IjoxNzIxMDM1NDk1LCJleHAiOjE3MjE2NDAyOTV9.Tg201_OmLz2ynMGJ_088Ux8jXjH0YVxL49zdKmSm0lw"}
```

```bash
curl -X POST http://localhost:3000/login -H "authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU5NywiaWF0IjoxNzIxMDM1NDk1LCJleHAiOjE3MjE2NDAyOTV9.Tg201_OmLz2ynMGJ_088Ux8jXjH0YVxL49zdKmSm0lw"
# {"status":"success","message":"logged in"}
```

```bash
curl -X POST http://localhost:3000/login -H "authorization: bearer fakeToken"
# {"status":"fail","message":"Unauthorized"}
```

## How to protect api route

```bash
npm install jsonwebtoken
npm install @types/jsonwebtoken --save-dev
```

```mdx-code-block
<Tabs>
<TabItem value="JavaScript">
```

TBD

```mdx-code-block
</TabItem>
<TabItem value="TypeScript">
```

[See Code](https://github.com/vdwstoffel/code-docs/tree/main/examples/javascript/express/protect_api_route_ts)

```bash
.
├── package.json
├── package-lock.json
├── src
│   ├── controllers
│   │   └── authController.ts
│   ├── index.ts
│   ├── jwt.ts
│   └── routes
│       └── userRoutes.ts
└── tsconfig.json
```

```ts title="jwt.ts"
import { JwtPayload, sign, verify } from "jsonwebtoken";

const JWT_SECRET = "superSecret"; // Secret should be at least 32 characters

export function createToken(id: number): string {
  return sign({ userId: id }, JWT_SECRET, { expiresIn: "1w" });
}

export function verifyToken(token: string): string | JwtPayload {
  return verify(token, JWT_SECRET);
}
```

```ts title="authController.ts"
import { NextFunction, Request, Response } from "express";
import { verifyToken, createToken } from "../jwt";

export const getToken = async (req: Request, res: Response) => {
  const token = createToken(597);
  res.status(200).json({ status: "success", token: token });
};

export const secret = async (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Secret Page" });
};

export const loginRequired = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ status: "fail", message: "Token not provided" });
  }

  try {
    verifyToken(token); // { userId: 597, iat: 1721031831, exp: 1721636631 }
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
};
```

```ts title="userRoutes.ts"
import { Router } from "express";

const router = Router();

import { loginRequired, getToken, secret } from "../controllers/authController";

router.route("/getToken").get(getToken);
router.route("/secret").post(loginRequired, secret);

export default router;
```

```ts title="index.ts"
import express, { Application, Request, Response } from "express";

import userRouter from "./routes/userRoutes";

const app: Application = express();
app.use(express.json());

app.use("/", userRouter);

app.listen(3000);
```

```mdx-code-block
</TabItem>
</Tabs>
```
