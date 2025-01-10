---
sidebar_label: "Authentication"
sidebar_position: 4
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Authentication

## Authenticatiing user with a json web token

```bash
npm i express
npm i sequelize sqlite3
npm nodemon
npm i bcrypt
npm i jsonwebtoken
```

```mdx-code-block
<Tabs>
<TabItem value="Model">
```

```js
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite:./demo.sqlite", { logging: false });

const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export async function createTable() {
  await User.sync();
}

export async function createUser(username, password) {
  await User.create({ username, password });
}

export async function getUserByUsername(username) {
  const res = await User.findOne({ where: { username } });
  return res.dataValues;
}

export async function getUserById(user_id) {
  const res = await User.findOne({ where: { user_id } });
  return res.dataValues;
}
```

```mdx-code-block
</TabItem>
<TabItem value="Controller">
```

```js title="userController.js"
import { createUser, getUserByUsername } from "../models/userModel.js";

import {
  hashPassword,
  verifyPassword,
  createToken,
} from "../utils/security.js";

export const createNewUser = async (req, res) => {
  const { username, password } = req.body;
  // Create a hashed version of the password
  const hashedPassword = await hashPassword(password);
  createUser(username, hashedPassword);
  res.status(201).json({ status: "success", message: "User created" });
};

export const getToken = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);

  // Check if the password the user provided matches the hashed version
  // by comparing the plain password and the saved password from the user db
  const isValidPassword = await verifyPassword(password, user.password);
  console.log(isValidPassword);
  if (!isValidPassword) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  // Create a JWT token and send it back to the user
  const token = createToken(user.user_id);
  res.status(200).json({ status: "success", token: token });
};
```

```js title="authController.js"
import { veriftyToken } from "../utils/security.js";
import { getUserById } from "../models/userModel.js";

export const authenticate = async (req, res, next) => {
  let token = req.headers.authorization || " ";
  token = token.split(" ")[1].replaceAll(" ", "");

  try {
    const verifiedToken = veriftyToken(token);
    const userDetails = await getUserById(verifiedToken.userId);
    // Attach userDetails to the request object, this will make it available in future middleware
    req.user = userDetails;
    next();
  } catch {
    res.status(401).json({ status: "error", message: "Unauthorized access" });
  }
};
```

```js title="secretController.js"
export const secetPage = async (req, res) => {
  const { username } = req.user; // The user was attached at the authenticate middleware
  console.log(username);
  res.status(200).json({ message: "Secret Page", user: username });
};
```

```mdx-code-block
</TabItem>
<TabItem value="Routes">
```

```js title="userRouter.js"
import { Router } from "express";

import { createNewUser, getToken } from "../controllers/userController.js";

const router = Router();

router.route("/user").post(createNewUser);
router.route("/getToken").post(getToken);

export default router;
```

```js title="secretRouter.js"
import { Router } from "express";

import { secetPage } from "../controllers/secretController.js";
import { authenticate } from "../controllers/authController.js";

const router = Router();

// Attach authenticate middleware to all routes below
router.use(authenticate);
router.route("/secret").get(secetPage);

export default router;
```

```mdx-code-block
</TabItem>
<TabItem value="Utils">
```

```js title="security.js"
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const JWT_SECRET = "SHOULD_HAVE_A_LENGTH_OF_32_CHARS";

export async function hashPassword(plainTextPassword) {
  const hashedPW = await bcrypt.hash(plainTextPassword, 12);
  return hashedPW;
}

export async function verifyPassword(plainTextPassword, hashedPassword) {
  const result = await bcrypt.compare(plainTextPassword, hashedPassword);
  return result;
}

export function createToken(userId) {
  return jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: "1w" });
}

export function veriftyToken(userToken) {
  return jwt.verify(userToken, JWT_SECRET);
}
```

```mdx-code-block
</TabItem>
<TabItem value="App">
```

```js title="index.js"
import express from "express";
const app = express();

import { createTable } from "./models/userModel.js";
import userRouter from "./routes/userRouter.js";
import secretRouter from "./routes/secretRouter.js";

// Initial Setup
createTable();

app.use(express.json()); // Required to parse json

app.use("/", userRouter);
app.use("/", secretRouter);

app.listen(3000);
```

```mdx-code-block
</TabItem>
</Tabs>
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

export const loginRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1];

  if (!token) {
    return res
      .status(400)
      .json({ status: "fail", message: "Token not provided" });
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
    passwordResetToken: {
      type: new DataTypes.STRING(),
      allowNull: true,
      defaultValue: null,
    },
    passwordResetTokenExpiry: {
      type: new DataTypes.DATE(),
      allowNull: true,
      defaultValue: null,
    },
    lastPasswordReset: {
      type: new DataTypes.DATE(),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

User.sync();

export async function createNewuser(userDetails: {
  userName: string;
  password: string;
}): Promise<void> {
  await User.create(userDetails);
}

export async function findUser(username: string): Promise<User> {
  const user: User[] = await User.findAll({ where: { userName: username } });
  return user[0];
}

export async function findUserByResetToken(resetToken: string): Promise<User> {
  const hashedToken = createHash("sha256").update(resetToken).digest("hex");
  const userData: User[] = await User.findAll({
    where: { passwordResetToken: hashedToken },
  });
  return userData[0];
}

export async function updatePasswordReset(
  userName: string,
  token: string
): Promise<void> {
  const hashedToken = createHash("sha256").update(token).digest("hex");
  const expireIn15Min = new Date(Date.now() + 15 * 60 * 1000);
  await User.update(
    {
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: expireIn15Min,
    },
    { where: { userName: userName } }
  );
}

export async function updatePassword(
  userName: string,
  password: string
): Promise<void> {
  // Add password hasing function here
  await User.update(
    {
      password: password,
      passwordResetToken: null,
      passwordResetTokenExpiry: null,
      lastPasswordReset: new Date(),
    },
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

  res
    .status(200)
    .json({ status: "success", message: "Password reset successful" });
};
```

```ts title="userRoutes.ts"
import { Router } from "express";

const router = Router();

import {
  createUser,
  passwordResetRequest,
  resetPassword,
} from "../controllers/userController";

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
