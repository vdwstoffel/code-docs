---
sidebar_label: Unit Testing
---

import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Unit Testing

## Demo App

### App

```
├── app.js
├── birdsController.js
├── birdsModel.js
├── birdsRoute.js
├── package.json
├── package-lock.json
├── server.js
└── tests
    └── birds.test.js
```

```mdx-code-block
<Tabs>
<TabItem value="server.js">
```

```js
const app = require("./app");

app.listen(3000);
```

```mdx-code-block
</TabItem>
<TabItem value="app.js">
```

```js
const express = require("express");
const app = express();

const birdRouter = require("./birdsRoute");

app.use("/birds", birdRouter);

module.exports = app;
```

```mdx-code-block
</TabItem>
<TabItem value="birdsRouter.js">
```

```js
const express = require("express");
const router = express.Router();

const birdController = require("./birdsController");

router.route("/").get(birdController.getAllBirds).post(birdController.createBird);

module.exports = router;
```

```mdx-code-block
</TabItem>
<TabItem value="birdsController.js">
```

```js
module.exports.getAllBirds = async (req, res) => {
  res.status(200).json({ status: "success", data: { type: "bird" } });
};

// http://127.0.0.1:3000/birds?title=birds&text=all_birds
module.exports.createBird = async (req, res) => {
  const { title, text } = req.query;

  if (!title || !text) {
    return res.status(400).json({ status: "error", message: "Invalid Input" });
  }
  res.status(200).json({ status: "success", data: req.query });
};
```

```mdx-code-block
</TabItem>
<TabItem value="test/birds.test.js">
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Tests

```mdx-code-block
<Tabs>
<TabItem value="Mocha + Chai">
```

```bash
npm i -D mocha
npm i -D chai@4.3.6 # version ^5 only supports modules
npm i -D chai-http
npm i -D nyc        # code coverage
```

```js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const should = chai.should();
chai.use(chaiHttp);

describe("Birds Route /Get", () => {
  it("Should return correct response", async () => {
    const res = await chai.request(app).get("/birds");
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
  });
});

describe("Birds Controller /Post", () => {
  it("Should return success if all fields are filed in", async () => {
    const res = await chai.request(app).post("/birds?title=birds&text=all_birds");
    res.should.have.status(200);
    res.body.should.have.property("status").eql("success");
  });

  it("Should fail in not all fields are filled", async () => {
    const res = await chai.request(app).post("/birds?title=bird");
    res.should.have.status(400);
    res.body.should.have.property("message").eql("Invalid Input");
  });
});
```

```json title="package.json"
 "scripts": {
    "test": "mocha ./tests/*.test.js",
    "coverage": "nyc --reporter=text --reporter=lcov npm test"
  },
```

```bash
npm test
npm run coverage
```

```mdx-code-block
</TabItem>
<TabItem value="Jest + Supertest">
```

```bash
npm i -D jest
npm i -D supertest
```

```js
const request = require("supertest");
const app = require("../app");

describe("Get /birds", () => {
  beforeAll(() => {
    console.log("Setup");
  });

  afterAll(() => {
    console.log("Teardown");
  });

  it("Should get data", async () => {
    const res = await request(app).get("/birds");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.type).toBe("bird");
  });
});

describe("Post /birds", () => {
  it("Should fail if params are wrong", async () => {
    const res = await request(app).post("/birds?title=birds");
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
    expect(res.body.message).toBe("Invalid Input");
  });

  it("Should pass if params are correct", async () => {
    const res = await request(app).post("/birds?title=birds&text=all_birds");
    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("birds");
    expect(res.body.data.text).toBe("all_birds");
  });
});
```

```json
 "scripts": {
    "test": "jest --testTimeout=5000",
    "coverage": "npx jest --coverage"
  },
```

```bash
npm test
npm run coverage
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Test Skeleton Examples

```mdx-code-block
<Tabs>
<TabItem value="GET">
```

```js
describe("GET /api/products/:id", () => {
  it("should return a product", async () => {
    const res = await request(app).get("/api/products/6331abc9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Product 1");
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="POST">
```

```js
describe("POST /api/products", () => {
  it("should create a product", async () => {
    const res = await request(app).post("/api/products").send({
      name: "Product 2",
      price: 1009,
      description: "Description 2",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Product 2");
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="PUT">
```

```js
describe("PUT /api/products/:id", () => {
  it("should update a product", async () => {
    const res = await request(app).patch("/api/products/6331abc9e9ececcc2d449e44").send({
      name: "Product 4",
      price: 104,
      description: "Description 4",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.price).toBe(104);
  });
});
```

```mdx-code-block
</TabItem>
<TabItem value="DELETE">
```

```js
describe("DELETE /api/products/:id", () => {
  it("should delete a product", async () => {
    const res = await request(app).delete("/api/products/6331abc9e9ececcc2d449e44");
    expect(res.statusCode).toBe(200);
  });
});
```

```mdx-code-block
</TabItem>
</Tabs>
```
