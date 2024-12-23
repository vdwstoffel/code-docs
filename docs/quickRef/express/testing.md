---
sidebar_label: "Testing"
sidebar_position: 5
---

# Testing

## How to run tests with Jest

```bash title="Terminal"
npm install --save-dev jest typescript ts-jest @types/jest
npm i --save-dev supertest @types/supertest
```

Create a `jest.config.js` file in the root folder

```bash title="Terminal"
npx ts-jest config:init
```

```bash title="Terminal"
.
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── controllers
│   │   └── catController.ts
│   ├── models
│   │   └── catModel.ts
│   ├── routes
│   │   └── catRouter.ts
│   ├── server.ts
│   └── tests
│       └── cat.test.ts
└── tsconfig.json
```

```ts title="catModel.ts"
import { Sequelize, Model, DataTypes } from "sequelize";
import { Cast } from "sequelize/types/utils";

const sequelize = new Sequelize("sqlite::memory:");

class Cat extends Model {
  declare id: number;
  declare name: string;
}

Cat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    tableName: "cats",
    sequelize, // passing the `sequelize` instance is required
  }
);

// Create Table
Cat.sync();

export async function getAllCats(): Promise<Cat[]> {
  return await Cat.findAll();
}

export async function createCat(name: string): Promise<void> {
  await Cat.create({ name: name });
}
```

```ts title="catController.ts"
import { Request, Response } from "express";

import { getAllCats, createCat } from "../models/catModel";

export const getCats = async (req: Request, res: Response) => {
  const cats = await getAllCats();
  res.status(200).json({ status: "Success", cats: cats });
};

export const addCat = async (req: Request, res: Response) => {
  const { name } = req.body;

  await createCat(name);

  res.status(200).json({ status: "Success", message: "New cat created" });
};
```

```ts title="catRouter.ts"
import { Router } from "express";

import { getCats, addCat } from "../controllers/catController";

const router: Router = Router();

router.route("/cat").get(getCats).post(addCat);

export default router;
```

```ts title="app.ts"
import express, { Application } from "express";

import { createTable } from "./models/catModel";
import catRouter from "./routes/catRouter";

const app: Application = express();

createTable();

app.use(express.json());

app.use("/", catRouter);

export default app;
```

```ts title="server.ts"
import app from "./app";

app.listen(3000);
```

```ts title="cat.test.ts"
import app from "../app";
import request from "supertest";

import { createTable } from "../models/catModel";

beforeAll(async () => {
  await createTable();
});

describe("Tests suite for Cats", () => {
  test("Create new cat", async () => {
    const response = await request(app).post("/cat").send({ name: "Mavis" });
    console.log(response);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("New cat created");
  });

  test("Get all cats", async () => {
    const response = await request(app).get("/cat");
    expect(response.statusCode).toBe(200);
  });
});

```

```json title="package.json
"scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "test": "jest --coverage"
  },
```
