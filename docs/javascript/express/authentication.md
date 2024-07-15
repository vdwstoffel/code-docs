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

## How to implement a password reset request

Reset Request

- User sents a password reset request
- check that the user exists
- generate a uuid token and save a hashed version in the db, send thew original to the user

Reset Password

- Check if user exists via the reset Token
- Check that new password and confirmn password match
- Check that the resetTokenExpiry is not null (meaning a request was sent)
- check that the current time is less than the resetTokenExpiry
- update the password
- sent user a new jwt token

```bash
npm i sequelize pg pg-hstore uuid
npm @types/uuid --save-dev
npm @types/sequalize --save-dev
```

```bash
.
├── package.json
├── package-lock.json
├── src
│   ├── controllers
│   │   └── userController.ts
│   ├── index.ts
│   ├── models
│   │   └── userModel.ts
│   └── routes
│       └── userRoutes.ts
└── tsconfig.json
```

```ts title="userModel.ts"
import { Sequelize, Model, DataTypes } from "sequelize";
import { createHash } from "crypto";

const sequelize = new Sequelize("sqlite:./test.sqlite");

class User extends Model {
  declare id: number;
  declare userName: string;
  declare password: string;
  declare passwordResetToken: string;
  declare passwordResetTokenExpiry: Date;
  declare lastPasswordReset: Date;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userName: { type: new DataTypes.STRING(128), allowNull: false },
    password: { type: new DataTypes.STRING(128), allowNull: false },
    passwordResetToken: { type: new DataTypes.STRING(), allowNull: true, defaultValue: null },
    passwordResetTokenExpiry: { type: new DataTypes.DATE(), allowNull: true, defaultValue: null },
    lastPasswordReset: { type: new DataTypes.DATE(), allowNull: true, defaultValue: null },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

User.sync();

export async function createNewuser(userDetails: { userName: string; password: string }): Promise<void> {
  await User.create(userDetails);
}

export async function findUser(username: string): Promise<User> {
  const user: User[] = await User.findAll({ where: { userName: username } });
  return user[0];
}

export async function findUserByResetToken(resetToken: string): Promise<User> {
  const hashedToken = createHash("sha256").update(resetToken).digest("hex");
  const userData: User[] = await User.findAll({ where: { passwordResetToken: hashedToken } });
  return userData[0];
}

export async function updatePasswordReset(userName: string, token: string): Promise<void> {
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const expireIn15Min = new Date(Date.now() + 15 * 60 * 1000);
  await User.update(
    { passwordResetToken: hashedToken, passwordResetTokenExpiry: expireIn15Min },
    { where: { userName: userName } }
  );
}

export async function updatePassword(userName: string, password: string): Promise<void> {
  // Add password hasing function here
  await User.update(
    { password: password, passwordResetToken: null, passwordResetTokenExpiry: null, lastPasswordReset: new Date() },
    { where: { userName: userName } }
  );
}
```

```ts title="userController.ts"
import { RequestHandler, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import {
  createNewuser,
  findUser,
  findUserByResetToken,
  updatePassword,
  updatePasswordReset,
} from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  await createNewuser({ userName: "John", password: "12345678" });
  res.status(200).json({ status: "success" });
};

export const passwordResetRequest = async (req: Request, res: Response) => {
  const { userName } = req.body;
  const user = await findUser(userName);

  if (!user) {
    res.status(401).json({ status: "fail", message: "User does not exists" });
  }

  const resetToken = uuidv4();
  await updatePasswordReset(userName, resetToken);

  // Generally you would have a email function and send the token as a response
  // Here the token is returned as an exmaple but this is a big security risk

  res.status(200).json({ status: "success", resetToken: resetToken });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const resetToken: string = req.params.resetToken;

  const user = await findUserByResetToken(resetToken);

  if (!user) {
    return res.status(401).json({ status: "fail", message: "Invalid Token" });
  }

  if (user.passwordResetTokenExpiry === null) {
    return res.status(401).json({ status: "fail", message: "Invalid Request" });
  }

  const currentTime: Date = new Date(Date.now());
  if (currentTime > user.passwordResetTokenExpiry) {
    return res.status(401).json({ status: "fail", message: "Token expired" });
  }

  await updatePassword(user.userName, password);

  res.status(200).json({ status: "success", message: "Password reset successful" });
};
```

```ts title="userRoutes.ts"
import { Router } from "express";

const router = Router();

import { createUser, passwordResetRequest, resetPassword } from "../controllers/userController";

router.route("/create").get(createUser);
router.route("/resetRequest").post(passwordResetRequest);
router.route("/resetPassword/:resetToken").post(resetPassword);

export default router;
```

```ts title="index.ts"
import express, { Application } from "express";

import userRouter from "./routes/userRoutes";

const app: Application = express();
app.use(express.json());

app.use("/", userRouter);

app.listen(3000);
```
