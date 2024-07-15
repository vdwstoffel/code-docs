---
sidebar_label: "Testing"
sidebar_position: 2
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
  declare preferredName: string | null;
}

Cat.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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

```
