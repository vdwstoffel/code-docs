---
sidebar_label: MongoDB
sidebar_position: 2
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Mongo

<!-- <DisplayLogo logo={Mongo} /> -->

[Readmore](../blog/mongodb)

## Getting Started

### Open Mongo terminal

```mongo
mongosh
```

### Show all databases

```
show dbs
```

### Show all collections in a database

```
show collections
```

### Create new/switch to databse

```
use demoApp
```

### Delete databse

after use dbName

```js
db.dropDatabase();
```

### Quit Mongo

```
quit
```

## CRUD

### Create

Example database name: `users`

```mdx-code-block
<Tabs>
<TabItem value="Insert">
```

```js
db.users.insert({ name: "Stoffel", age: 31, color: "white" });
```

```mdx-code-block
</TabItem>
<TabItem value="Insert Many">
```

```js
db.users.insertMany([
  { name: "Rits", age: 17, color: "Brown" },
  { name: "Mavis", age: 5, color: "Black" },
  { name: "Lily", age: 3, color: "Black" },
]);
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Read

```mdx-code-block
<Tabs>
<TabItem value="Find All">
```

```js
db.users.find();
```

output:

```js
[
  {
    _id: ObjectId("654d3c0ed9e63d1373511c15"),
    name: "Rits",
    age: 17,
    color: "Brown",
  },
  {
    _id: ObjectId("654d3c0ed9e63d1373511c16"),
    name: "Mavis",
    age: 5,
    color: "Black",
  },
  {
    _id: ObjectId("654d3c0ed9e63d1373511c17"),
    name: "Lily",
    age: 3,
    color: "Black",
  },
];
```

```mdx-code-block
</TabItem>
<TabItem value="Find by Filter">
```

```js
db.users.find({ name: "Rits" });
```

output

```js
[
  {
    _id: ObjectId("654d3c0ed9e63d1373511c15"),
    name: "Rits",
    age: 17,
    color: "Brown",
  },
];
```

```mdx-code-block
</TabItem>
<TabItem value="Advance Filters">
```

| operator | use                |
| -------- | ------------------ |
| $lte     | less than or equal |
| $gte     | greater than equal |
| $le      | less than          |
| $gt      | greater than       |

```js
db.users.find({ age: { $lte: 10 } });
```

output

```js
[
  {
    _id: ObjectId("654d3c0ed9e63d1373511c16"),
    name: "Mavis",
    age: 5,
    color: "Black",
  },
  {
    _id: ObjectId("654d3c0ed9e63d1373511c17"),
    name: "Lily",
    age: 3,
    color: "Black",
  },
];
```

**or** statement

```js
db.users.find({ $or: [{ age: { $lte: 20 } }, { name: "rits" }] });
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Update

```mdx-code-block
<Tabs>
<TabItem value="Update One">
```

```js
db.users.updateOne({ name: "Lily" }, { $set: { color: "White & Black" } });
```

```mdx-code-block
</TabItem>
<TabItem value="Update Many">
```

find all that are older than one and add specie cat to them

```js
db.users.updateMany({ age: { $gt: 1 } }, { $set: { species: "cat" } });
```

```mdx-code-block
</TabItem>
<TabItem value="Add property">
```

```js
db.users.update({ name: "Lily" }, { $set: { feet: "White" } });
```

find

```js
[
  {
    _id: ObjectId("654d3c0ed9e63d1373511c17"),
    name: "Lily",
    age: 3,
    color: "White & Black",
    feet: "White",
  },
];
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Delete

```mdx-code-block
<Tabs>
<TabItem value="DeleteOne">
```

```js
db.users.deleteOne({ name: "Rits" });
```

```mdx-code-block
</TabItem>
<TabItem value="Delete All">
```

```js
db.users.deleteMany({});
```

```mdx-code-block
</TabItem>
</Tabs>
```
