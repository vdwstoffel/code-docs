---
sidebar_label: Mongoose
sidebar_position: 5
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Mongoose

## Getting Started

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

## CRUD

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

## Schema's

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

### Types

```mdx-code-block
<Tabs>
<TabItem value="Array">
```

```js
const tourSchema = new Schema({
  items = [String]
});
```

```mdx-code-block
</TabItem>
<TabItem value="String">
```

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
```

```mdx-code-block
</TabItem>
<TabItem value="GeoJson">
```

```js
const citySchema = new mongoose.Schema({
  name: String,
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
```

```mdx-code-block
</TabItem>
<TabItem value="Date">
```

```js
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
  createdAt: {
    type: Date,
    default: Date.now, // This will set the default value to the current date and time
  },
});
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Exclude Field from return

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

## Aggregation Pipelines

```js
const bookData = [
  { title: "Book 1", author: "Author 1", genre: "Fiction", publishedYear: 2020, rating: 4.5 },
  { title: "Book 2", author: "Author 2", genre: "Science Fiction", publishedYear: 2021, rating: 4.2 },
  { title: "Book 3", author: "Author 3", genre: "Mystery", publishedYear: 2019, rating: 3.8 },
  { title: "Book 4", author: "Author 1", genre: "Fantasy", publishedYear: 2020, rating: 4.5 },
  { title: "Book 5", author: "Author 4", genre: "Non-fiction", publishedYear: 2022, rating: 3.9 },
  { title: "Book 6", author: "Author 2", genre: "Science Fiction", publishedYear: 2018, rating: 4.1 },
];
```

```js
const pipelineStages = async () => {
  const result = await Author.aggregate([
    // Match authors with a rating greater than or equal to 3.9
    { $match: { rating: { $gte: 3.9 } } },
    // Group authors by genre and calculate the average rating for each genre
    { $group: { _id: "$genre", avgRating: { $avg: "$rating" } } },
    // Add a new field 'genre' with the value from '_id'
    { $addFields: { genre: "$_id" } },
    // Project the fields to include only 'genre' and 'avgRating', and exclude '_id'
    { $project: { _id: 0 } },
    // Sort the result by average rating in descending order
    { $sort: { avgRating: -1 } },
    // Limit the result to the top 10 genres based on average rating
    { $limit: 10 },
  ]);
};
```

```js
[
  { avgRating: 4.5, genre: "Fiction" },
  { avgRating: 4.5, genre: "Fantasy" },
  { avgRating: 4.15, genre: "Science Fiction" },
  { avgRating: 3.9, genre: "Non-fiction" },
];
```

## Virtuals

Virtuals are additional fields for a model that are not stored in the database but can be computed or derived from other fields.

```js
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    duration: {
      type: Number,
    },
  },

  // highlight-next-line
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//highlight-start
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});
//highlight-end

const Tour = mongoose.model("Tour", tourSchema);
```

```js
{
  name: 'stoffel',
  duration: 7,
  durationWeeks: 1
}
```

## Document Middleware

Document middleware in Mongoose allows you to define functions that run on a document instance before or after certain operations, such as saving or removing a document. This provides a way to execute custom logic at specific points in the lifecycle of a document

<Tabs>
<TabItem value="Pre">

```js
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
  combo: {
    type: String,
  },
});

// pre middleware: run before event
tourSchema.pre("save", function (next) {
  // on save
  this.combo = `${name}-${duration}`; // add a new property
  console.log(this); // this is a copy of the document
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
```

```js
{
  name: 'stoffel',
  duration: 3,
  combo: 'stoffel-3'
}
```

</TabItem>
<TabItem value="Post">

```js
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

tourSchema.post("save", function (doc, next) {
  console.log(doc); // prints the document that was saved
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
```

```js
{
  name: 'stoffel',
  duration: 3,
}
```

</TabItem>
</Tabs>

## Query Middleware

Query middleware in Mongoose provides a way to execute functions or modify the query before or after it is sent to the database. It allows you to intercept and modify queries, providing a level of control over the query execution process.

<Tabs>
<TabItem value="Pre">

```js
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

// regex for all find methods
tourSchema.pre(/^find/, function (next) {
  console.log(this); // refers to the query
  this.find({ duration: { $gte: 5 } }); //only return 5 or greater
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
```

</TabItem>
<TabItem value="Post">

```js
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

// regex for all find methods
tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  next();
});

const Tour = mongoose.model("Tour", tourSchema);
```

</TabItem>
</Tabs>

## Aggregation Middleware

Aggregation middleware in Mongoose allows you to define functions that run before or after an aggregation pipeline is executed. This provides a way to perform custom logic, transformations, or validations during the aggregation process.

<Tabs>
<TabItem value="Pre">

```js
schema.pre("aggregate", function (next) {
  // Modify or add stages to the aggregation pipeline
  this.pipeline().unshift({ $match: { isActive: true } });
  next();
});
```

</TabItem>
<TabItem value="Post">

```js
// Example post-hook after aggregation
schema.post("aggregate", function (result) {
  // Process or log the aggregation result
});
```

</TabItem>
</Tabs>

## Validators

<Tabs>
<TabItem value="Strings">

```js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username cannot exceed 20 characters"],
  },
  role: {
    type: String,
    enum: { values: ["user", "admin", "editor"], message: "Choose a valid Role" },
    default: "user", // Default value if not provided
  },
});
```

</TabItem>
<TabItem value="Numbers">

```js
const userSchema = new mongoose.Schema({
  age: {
    type: Number,
    min: [18, "Must be at least 18 years old"],
    max: [99, "Cannot be more than 99 years old"],
  },
});
```

</TabItem>
<TabItem value="Custom">

```js
const userSchema = new mongoose.Schema({
  price: {
    type: Number
  }
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price;
      },
      message: "Discount to high",
    },
  },
});
```

</TabItem>
</Tabs>

**[Validator - npm](https://www.npmjs.com/package/validator)**

```js
const validator = require("validator")

name: {
      type: String,
      required: [true, "Name required"],
      validator: [validator.isAlpha, 'Error']
    }
```

## Adding functions to documents

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

//highlight-start
UserSchema.methods.greet = function () {
  return `Hello ${this.name}`;
};
//highlight-end

const Tour = model("Tour", tourSchema);
```

```js
const UserModel = require("./xxx");
UserModel.greet();
```

## Mongo Sanitize

Object keys starting with a $ or containing a . are reserved for use by MongoDB as operators. Without this sanitization, malicious users could send an object containing a $ operator, or including a ., which could change the context of a database operation. Most notorious is the $where operator, which can execute arbitrary JavaScript on the database.

```bash
npm i express-mongo-sanitize
```

```js
const express = require("express");
const app = express();
//highlight-next-line
const mongoSanitize = require("express-mongo-sanitize");

//highlight-next-line
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000);
```

## Embedding Documents

Embedding a document in MongoDB refers to the practice of nesting one document (or schema) within another document.

```js
const mongoose = require("mongoose");

// Define the Address schema separately
const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  country: String,
});

// Create the Address model
const Address = mongoose.model("Address", addressSchema);

// Define the Person schema with a reference to the Address model
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: { type: mongoose.Schema.ObjectId, ref: "Address" }, // Reference to Address model
});

const Person = mongoose.model("Person", personSchema);
```

```js
// Assuming an existing addressId for an Address document
const existingAddressId = "1234567890";

const newPerson = new Person({
  name: "John Doe",
  age: 30,
  address: existingAddressId, // Assigning the addressId to the address field in Person
});
```

```js
const user = await Person.findById(personId).populate("address");

{
  "_id": "000000000",
  "name": "John Doe",
  "age": 30,
  "address": {
    "_id": "1234567890",
    "street": "123 Main St",
    "city": "Exampleville",
    "country": "Exampleland"
  }
}
```

### Only return certain fields

```js
/**
 * Find a person by their ID and populate their address field with the street and city properties.
 */
const user = await Person.findById(personId).populate("address", "street city");

{
  "_id": "000000000",
  "name": "John Doe",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Exampleville"
  }
}

```

### Virtual Populate

```js
const mongoose = require("mongoose");

// Define the Post schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});

// Define the Comment schema
const commentSchema = new mongoose.Schema({
  text: String,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }, // Reference to Post model
});

// Create the models
const Post = mongoose.model("Post", postSchema);
const Comment = mongoose.model("Comment", commentSchema);

// Define the virtual populate
postSchema.virtual("comments", {
  ref: "Comment", // 
  localField: "_id", // local field to reference
  foreignField: "post", // field in Schema
});

// Retrieve a post and populate its comments
const getPostWithComments = async (postId) => {
  const post = await Post.findById(postId).populate("comments");
  return post;
};
```
