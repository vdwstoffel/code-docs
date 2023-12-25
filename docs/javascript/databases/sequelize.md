---
sidebar_label: Sequelize
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Sequelize

[Read More](https://sequelize.org/docs/v6/)

## Install dependencies

```mdx-code-block
<Tabs>
<TabItem value="PostgreSQL">
```

```bash
npm install sequelize pg pg-hstore
```

```mdx-code-block
</TabItem>
<TabItem value="SQLite3">
```

```bash
npm install sequelize sqlite3
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Getting Started

Connect to database

```mdx-code-block
<Tabs>
<TabItem value="PostgreSQL">
```

```js
const sequelize = new Sequelize("postgres://username:password@example.com:5432/snippets");
```

```mdx-code-block
</TabItem>
<TabItem value="SQLite3">
```

```js
const sequelize = new Sequelize("sqlite:./test.sqlite");
```

```mdx-code-block
</TabItem>
</Tabs>
```

```js title="UserModel.js"
"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./test.sqlite", { logging: console.log });

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});

module.exports.createTable = async () => {
  await User.sync();
};

module.exports.createUser = async (firstName, age) => {
  // builds the user and saves it to the database
  await User.create({ firstName, age });
};
```

```js title="app.js"
"use strict";

const user = require("./userModel.js");

user.createTable();
user.createUser("Stoffel", 31);
```

## Creating Model

```js
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./test.sqlite", { logging: console.log });

const User = sequelize.define("User", {
  userNumber: {
    type: DataTypes.Integer,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "John Doe",
    unique: true,
  },
  bar: {
    type: DataTypes.DATETIME,
    defaultValue: DataTypes.NOW,
    // This way, the current date/time will be used to populate this column (at the moment of insertion)
  },
  // foreign keys
  references: {
    // This is a reference to another model
    model: Bar,

    // This is the column name of the referenced model
    key: "id",

    // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
    deferrable: Deferrable.INITIALLY_IMMEDIATE,
    // Options:
    // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
    // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
    // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
  },
});
```

## CRUD

```js
const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});
```

### Create

```js
module.exports.createUser = async (firstName, age) => {
  // builds the user and saves it to the database
  await User.create({ firstName, age });
};
```

### Read

```mdx-code-block
<Tabs>
<TabItem value="Read All">
```

```js
module.exports.getAllUsers = async () => {
  const users = await User.findAll();
  return JSON.parse(JSON.stringify(user, null, 2));
};
```

```mdx-code-block
</TabItem>
<TabItem value="Where">
```

```js
module.exports.getUser = async (name) => {
  const user = await User.findAll({ where: { firstName: name } });
  return JSON.parse(JSON.stringify(user, null, 2));
};
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Update

```js
module.exports.updateUser = async (name, age) => {
  await User.update({ age: age }, { where: { firstName: name } });
};
```

### Delete

```js
module.exports.deleteUser = async (name) => {
  await User.destroy({ where: { firstName: name } });
};
```

## Raw Queries

```js
module.exports.rawQuery = async () => {
  const [results, metadata] = await sequelize.query("SELECT * FROM Users");
  console.log(results);
};
```

```js
module.exports.RawUpdate = async () => {
  const [results, metadata] = await sequelize.query("UPDATE Users SET age= 99 WHERE firstName = 'Jacob'");
  console.log(results);
};
```
