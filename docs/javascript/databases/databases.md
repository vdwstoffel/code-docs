---
sidebar_label: "Databases"
sidebar_position: 5
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## PostgreSQL

```bash
npm i pg
npm dotenv
```

```javascript
"use strict";

const { Client } = require("pg");
require("dotenv").config({ path: "../../.env" });

class Connector {
  constructor() {
    (this.database = process.env.DATABASE),
      (this.host = process.env.HOST),
      (this.user = process.env.DB_USER),
      (this.password = process.env.DB_PASSWORD);
  }

  connectToDatabase = () => {
    /* Establish a connection to the database
       and return a client object */
    const client = new Client({
      host: this.host,
      port: 5432,
      database: this.database,
      user: this.username,
      password: this.password,
      idle_in_transaction_session_timeout: 3,
    });
    return client;
  };
}

class User extends Connector {
  getUser = async (argument) => {
    const client = this.connectToDatabase();
    await client.connect();
    try {
      const query = await client.query(`SELECT * FROM users
                                        WHERE username = '${argument}';`);
      await client.end();
      return query.rows;
    } catch (err) {
      console.log(err);
    }
  };

  insertUser = async (username, age) => {
    const client = this.connectToDatabase();
    await client.connect();
    try {
      await client.query(`INSERT INTO users (username, age)
                          VALUES ('${username}', '${age}');`);
      await client.end();
    } catch (err) {
      console.log(err);
      await client.end();
    }
  };
}
```

## Mongoose

[MongoDB](../databases/mongodb.md)

```bash
npm i mongoose
```

```javascript title="userModel.js"
"use strict";

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UsersSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: [1, "Invalid Age"], // Show a error message if age is less than 1
    max: 99,
  },
  hobbies: [],
});

module.exports = model("User", UsersSchema); // Create and export the schema
```

```javascript title="app.js"
"use strict";

const mongoose = require("mongoose");
const User = require("./userModel");

mongoose
  .connect("mongodb://127.0.0.1:27017/demoApp")
  .then((res) => console.log("Connected!"))
  .catch((err) => console.log(err));

const findAll = async () => {
  const query = await User.find();
  console.log(query);
};
```

### CRUD

```mdx-code-block
<Tabs>
<TabItem value="Create">
```

```javascript
await User.create({
  name: "Stoffel",
  age: 30,
  hobbies: ["Programming", "Gaming"],
});
```

```mdx-code-block
</TabItem>
<TabItem value="Read">
```

```javascript
const query = await User.find(); // Find all
const query = await User.find({ age: { $gte: 1, $lte: 10 } }); // $gte: greate than, $lte: less than
const query = await User.findOne({ username: name });
const query = await User.findById(id);
```

```mdx-code-block
</TabItem>
<TabItem value="Update">
```

```javascript
const id = await findUserId(name);
await User.findOneAndUpdate(id, { age: age });

// username to find, username to update to
await User.findOneAndUpdate({ username: "Stoffel" }, { username: "Christoff" });

await Model.findByIdAndUpdate(id, { name: 'jason bourne' }, {new=true, runValidators=true})
```

```mdx-code-block
</TabItem>
<TabItem value="Delete">
```

```javascript
await User.deleteMany(); // Delete all
await User.deleteMany({ age: { $gte: ageAbove } });
await User.deleteMany({ username: /Mav/ });

await User.deleteOne({ username: name });

const id = await findUserId(name);
await User.findByIdAndDelete(id);
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Schema's

```js
const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    unique: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "Price required"],
  },
});

const Tour = model("Tour", tourSchema);
```

#### Set an array type

```js
const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
  items = [String]
});

const Tour = model("Tour", tourSchema);

```

#### Exclude Field from return

Excludes the field when a request is made

```js
const { Schema, model } = require("mongoose");

const tourSchema = new Schema({
  rating: {
    type: Number,
    default: 4.5,
    // highlight-next-line
    select: false,
  },
});

const Tour = model("Tour", tourSchema);
```
